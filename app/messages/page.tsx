'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { Conversation, MessageItem, UserProfile } from '@/lib/types';
import { formatTimeAgo, formatDate } from '@/lib/utils';
import {
  MessageSquare,
  Send,
  ShieldAlert,
  Repeat,
  Check,
  CheckCheck,
  User,
  ExternalLink,
  Package,
  AlertTriangle,
  X,
} from 'lucide-react';

export default function MessagesPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [newMessageText, setNewMessageText] = useState('');

  // Abuse Report Modal
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate commercial behavior');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  useEffect(() => {
    const update = () => {
      const user = store.getCurrentUser();
      setCurrentUser(user);

      if (user) {
        const allConvs = store.getConversations();
        // Filter conversations where current user is participant
        const userConvs = allConvs.filter(
          (c) => c.supplierId === user.id || c.factoryId === user.id || c.participantIds.includes(user.id)
        );
        setConversations(userConvs);

        if (userConvs.length > 0 && !activeConvId) {
          setActiveConvId(userConvs[0].id);
          loadMessages(userConvs[0].id, user.id);
        } else if (activeConvId) {
          loadMessages(activeConvId, user.id);
        }
      }
    };

    update();
    window.addEventListener('recyconnect_store_updated', update);
    return () => window.removeEventListener('recyconnect_store_updated', update);
  }, [activeConvId]);

  const loadMessages = (convId: string, userId: string) => {
    const msgs = store.getMessages(convId);
    setMessages(msgs);
    store.markConversationRead(convId, userId);
  };

  const handleSelectConv = (convId: string) => {
    setActiveConvId(convId);
    if (currentUser) {
      loadMessages(convId, currentUser.id);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !activeConvId || !newMessageText.trim()) return;

    store.sendMessage(
      activeConvId,
      currentUser.id,
      `${currentUser.displayName} (${currentUser.organizationName})`,
      newMessageText.trim()
    );

    setNewMessageText('');
    loadMessages(activeConvId, currentUser.id);
  };

  const handleReportAbuse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !activeConv) return;

    store.reportAbuse({
      reporterId: currentUser.id,
      reporterName: currentUser.displayName,
      entityType: 'message',
      entityId: activeConv.id,
      entityTitleOrSnippet: `Chat with ${counterpartyName}: "${activeConv.lastMessageText.slice(0, 50)}"`,
      reason: reportReason,
      details: reportDetails,
    });

    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportModalOpen(false);
      setReportDetails('');
    }, 1500);
  };

  const activeConv = conversations.find((c) => c.id === activeConvId);

  const counterpartyName = activeConv
    ? currentUser?.id === activeConv.supplierId
      ? activeConv.factoryName
      : activeConv.supplierName
    : '';

  return (
    <div className="bg-forest-900 forest-grid-bg min-h-[85vh] py-6 text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Messages Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Platform Direct Messaging</h1>
            <p className="text-xs text-forest-100/90">
              Direct counterparty communication linked to recyclable material lots and inquiries.
            </p>
          </div>
          <Link
            href="/connections"
            className="text-xs font-bold text-craft-yellow hover:underline flex items-center gap-1"
          >
            <Repeat size={14} />
            <span>View All Transaction Trackers</span>
          </Link>
        </div>

        {/* Messaging Workspace Grid */}
        <div className="craft-card rounded-3xl border border-craft-border shadow-elevation overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Left Column: Conversations List */}
          <aside className="lg:col-span-4 border-r border-border flex flex-col h-full bg-cream-50/50">
            <div className="p-4 border-b border-border bg-white flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal uppercase tracking-wider">
                Conversations ({conversations.length})
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-border">
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-xs text-charcoal-muted">
                  <MessageSquare size={28} className="mx-auto mb-2 text-charcoal-muted/50" />
                  <p>No active conversations yet.</p>
                  <p className="text-[11px] mt-1">Inquiries sent or received will appear here.</p>
                </div>
              ) : (
                conversations.map((conv) => {
                  const isSelected = conv.id === activeConvId;
                  const partnerName =
                    currentUser?.id === conv.supplierId ? conv.factoryName : conv.supplierName;
                  const unreadCount =
                    currentUser?.id === conv.supplierId
                      ? conv.unreadCountSupplier
                      : conv.unreadCountFactory;

                  return (
                    <button
                      key={conv.id}
                      onClick={() => handleSelectConv(conv.id)}
                      className={`w-full p-4 text-left transition-colors flex flex-col gap-1.5 ${
                        isSelected ? 'bg-purple-50/80 border-l-4 border-brand-primary' : 'hover:bg-cream-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-charcoal truncate max-w-[180px]">
                          {partnerName}
                        </span>
                        <span className="text-[10px] text-charcoal-muted">
                          {formatTimeAgo(conv.lastMessageAt)}
                        </span>
                      </div>

                      <p className="text-[11px] font-semibold text-brand-primary truncate">
                        {conv.listingTitle}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="text-xs text-charcoal-muted line-clamp-1 flex-1">
                          {conv.lastMessageText}
                        </p>
                        {unreadCount > 0 && (
                          <span className="ml-2 px-1.5 py-0.5 rounded-full bg-brand-primary text-white text-[10px] font-bold">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* Right Column: Chat Thread & Action Bar */}
          <main className="lg:col-span-8 flex flex-col h-full bg-white">
            {activeConv ? (
              <>
                {/* Chat Top Banner with Linked Listing Info */}
                <div className="p-4 border-b border-border bg-cream-50 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-charcoal truncate">{counterpartyName}</h3>
                      <span className="text-[10px] font-mono text-teal px-1.5 py-0.5 rounded-md bg-teal-50 border border-teal-200">
                        Direct Thread
                      </span>
                    </div>
                    <Link
                      href={`/materials/${activeConv.listingId}`}
                      className="text-xs text-brand-primary hover:underline flex items-center gap-1 truncate mt-0.5"
                    >
                      <Package size={13} />
                      <span className="truncate">{activeConv.listingTitle}</span>
                      <ExternalLink size={11} />
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {activeConv.connectionId && (
                      <Link
                        href={`/connections?id=${activeConv.connectionId}`}
                        className="px-3 py-1.5 rounded-xl bg-brand-subtle text-brand-primary text-xs font-semibold hover:bg-brand-lavender/40 transition-colors"
                      >
                        Deal Tracker
                      </Link>
                    )}
                    <button
                      onClick={() => setIsReportModalOpen(true)}
                      title="Report abusive or misleading counterparty messages"
                      className="p-2 rounded-xl text-charcoal-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <ShieldAlert size={16} />
                    </button>
                  </div>
                </div>

                {/* Messages Thread Container */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white/50 max-h-[460px]">
                  {messages.map((msg) => {
                    const isMe = msg.senderId === currentUser?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <span className="text-[10px] text-charcoal-muted font-medium mb-1">
                          {isMe ? 'You' : msg.senderName} · {formatTimeAgo(msg.createdAt)}
                        </span>
                        <div
                          className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-brand-primary text-white rounded-br-xs shadow-xs'
                              : 'bg-cream-100 text-charcoal rounded-bl-xs border border-border'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input Box */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-border bg-white flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    placeholder="Type your reply, negotiate price, or discuss batch pickup..."
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-cream-50 border border-border text-xs focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                  />
                  <button
                    type="submit"
                    disabled={!newMessageText.trim()}
                    className="px-4 py-2.5 rounded-2xl bg-brand-primary hover:bg-brand-hover text-white text-xs font-bold transition-colors flex items-center gap-1.5 disabled:opacity-40"
                  >
                    <span>Send</span>
                    <Send size={13} />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-charcoal-muted">
                <MessageSquare size={36} className="mb-2 text-charcoal-muted/40" />
                <p className="text-sm font-semibold">Select a conversation from the left to read messages</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ABUSE REPORTING MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-elevation border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-rose-50">
              <div className="flex items-center gap-2 text-rose-800">
                <AlertTriangle size={18} />
                <h3 className="text-sm font-bold">Report Misleading Behavior</h3>
              </div>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 rounded-full text-rose-800 hover:bg-rose-100"
              >
                <X size={16} />
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-6 text-center text-xs space-y-2">
                <CheckCheck size={28} className="text-teal mx-auto" />
                <h4 className="font-bold text-charcoal">Report Dispatched to Compliance</h4>
                <p className="text-charcoal-muted">Our admin operations team has queued this thread for audit.</p>
              </div>
            ) : (
              <form onSubmit={handleReportAbuse} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Select Reason *
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="Off-platform payment extortion">Off-platform payment extortion</option>
                    <option value="Material specification misrepresentation">Material specification misrepresentation</option>
                    <option value="Unprofessional or abusive language">Unprofessional or abusive language</option>
                    <option value="Broker impersonation">Broker impersonation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Specific Details *
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Provide exact quotes or explanation of the issue..."
                    className="w-full px-3 py-2 rounded-xl border border-border text-xs focus:ring-2 focus:ring-rose-400"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-3.5 py-2 rounded-xl border border-border text-xs font-semibold text-charcoal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
