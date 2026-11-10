import { MaterialListing, FactoryPreferences, MatchResult } from './types';

/**
 * Deterministic MVP Matching Engine for RecyConnect
 * Computes transparent, explainable compatibility score (0-100%) between a factory's
 * sourcing preferences and a published material listing.
 */
export function calculateMatchScore(
  listing: MaterialListing,
  preferences: FactoryPreferences
): MatchResult {
  const reasons: string[] = [];
  let score = 0;

  // 1. Material Category Match (Weight: 35 points)
  if (preferences.requiredCategories.length === 0) {
    score += 20;
    reasons.push('Open category acceptance');
  } else if (preferences.requiredCategories.includes(listing.categorySlug)) {
    score += 35;
    reasons.push(`Direct match for category: ${listing.categoryName}`);
  } else {
    // No match on category is a dealbreaker
    return {
      listing,
      score: 10,
      reasons: ['Does not match required material categories'],
    };
  }

  // 2. Geographic / Region Compatibility (Weight: 25 points)
  if (
    preferences.acceptableRegions.length === 0 ||
    preferences.acceptableRegions.includes('All Regions') ||
    preferences.acceptableRegions.some((r) =>
      listing.region.toLowerCase().includes(r.toLowerCase()) ||
      listing.location.toLowerCase().includes(r.toLowerCase())
    )
  ) {
    score += 25;
    reasons.push(`Within accepted service area (${listing.region})`);
  } else {
    reasons.push(`Outside primary region (${listing.region})`);
  }

  // 3. Quantity Threshold Compatibility (Weight: 20 points)
  // Check if quantity meets factory minimum
  if (preferences.minQuantity <= 0) {
    score += 20;
    reasons.push('Quantity meets open requirements');
  } else if (listing.quantity >= preferences.minQuantity) {
    score += 20;
    reasons.push(`Quantity (${listing.quantity} ${listing.unit}) meets minimum threshold (${preferences.minQuantity} ${preferences.preferredUnit})`);
  } else if (listing.quantity >= preferences.minQuantity * 0.5) {
    score += 10;
    reasons.push(`Partial quantity match (${listing.quantity} of ${preferences.minQuantity} ${preferences.preferredUnit})`);
  } else {
    reasons.push(`Below preferred minimum volume (${preferences.minQuantity} ${preferences.preferredUnit})`);
  }

  // 4. Availability Status Match (Weight: 10 points)
  if (
    preferences.preferredAvailability.length === 0 ||
    preferences.preferredAvailability.includes(listing.availabilityStatus)
  ) {
    score += 10;
    const availLabel =
      listing.availabilityStatus === 'ready_now'
        ? 'Ready for pickup'
        : listing.availabilityStatus === 'recurring_weekly'
        ? 'Scheduled recurring supply'
        : 'In stock';
    reasons.push(`Availability matches: ${availLabel}`);
  }

  // 5. Quality / Grade match (Weight: 10 points)
  if (
    preferences.qualityPreferences.length === 0 ||
    preferences.qualityPreferences.some(
      (q) =>
        listing.qualityGrade.toLowerCase().includes(q.toLowerCase()) ||
        q.toLowerCase().includes(listing.qualityGrade.toLowerCase())
    )
  ) {
    score += 10;
    reasons.push(`Quality grade compatible (${listing.qualityGrade})`);
  }

  return {
    listing,
    score: Math.min(100, Math.max(0, score)),
    reasons,
  };
}

export function rankListingsForFactory(
  listings: MaterialListing[],
  preferences: FactoryPreferences
): MatchResult[] {
  return listings
    .filter((l) => l.isPublished && l.availabilityStatus !== 'sold' && l.availabilityStatus !== 'unavailable')
    .map((l) => calculateMatchScore(l, preferences))
    .sort((a, b) => b.score - a.score);
}
