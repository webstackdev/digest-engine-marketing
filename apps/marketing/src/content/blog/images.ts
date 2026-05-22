import type { StaticImageData } from "next/image";

import authorityAwareRankingHeroImage from "@/content/blog/authority-aware-ranking/hero.jpg";
import authorityAwareRankingPreviewImage from "@/content/blog/authority-aware-ranking/preview.jpg";
import competitiveIntelligenceBuiltInHeroImage from "@/content/blog/competitive-intelligence-built-in/hero.jpg";
import competitiveIntelligenceBuiltInPreviewImage from "@/content/blog/competitive-intelligence-built-in/preview.jpg";
import composableAiSkillsHeroImage from "@/content/blog/composable-ai-skills/hero.jpg";
import composableAiSkillsPreviewImage from "@/content/blog/composable-ai-skills/preview.jpg";
import draftAssemblyNotJustCurationHeroImage from "@/content/blog/draft-assembly-not-just-curation/hero.jpg";
import draftAssemblyNotJustCurationPreviewImage from "@/content/blog/draft-assembly-not-just-curation/preview.jpg";
import humanReviewByDefaultHeroImage from "@/content/blog/human-review-by-default/hero.jpg";
import humanReviewByDefaultPreviewImage from "@/content/blog/human-review-by-default/preview.jpg";
import perProjectRelevanceTrainingHeroImage from "@/content/blog/per-project-relevance-training/hero.jpg";
import perProjectRelevanceTrainingPreviewImage from "@/content/blog/per-project-relevance-training/preview.jpg";
import selfHostableBringYourOwnModelsHeroImage from "@/content/blog/self-hostable-bring-your-own-models/hero.jpg";
import selfHostableBringYourOwnModelsPreviewImage from "@/content/blog/self-hostable-bring-your-own-models/preview.jpg";
import trendVelocityNotTrendVolumeHeroImage from "@/content/blog/trend-velocity-not-trend-volume/hero.jpg";
import trendVelocityNotTrendVolumePreviewImage from "@/content/blog/trend-velocity-not-trend-volume/preview.jpg";
import unifiedEntityProfilesHeroImage from "@/content/blog/unified-entity-profiles/hero.jpg";
import unifiedEntityProfilesPreviewImage from "@/content/blog/unified-entity-profiles/preview.jpg";

export const blogHeroImages: Record<string, StaticImageData> = {
  "authority-aware-ranking": authorityAwareRankingHeroImage,
  "competitive-intelligence-built-in": competitiveIntelligenceBuiltInHeroImage,
  "composable-ai-skills": composableAiSkillsHeroImage,
  "draft-assembly-not-just-curation": draftAssemblyNotJustCurationHeroImage,
  "human-review-by-default": humanReviewByDefaultHeroImage,
  "per-project-relevance-training": perProjectRelevanceTrainingHeroImage,
  "self-hostable-bring-your-own-models": selfHostableBringYourOwnModelsHeroImage,
  "trend-velocity-not-trend-volume": trendVelocityNotTrendVolumeHeroImage,
  "unified-entity-profiles": unifiedEntityProfilesHeroImage,
};

export const blogPreviewImages: Record<string, StaticImageData> = {
  "authority-aware-ranking": authorityAwareRankingPreviewImage,
  "competitive-intelligence-built-in": competitiveIntelligenceBuiltInPreviewImage,
  "composable-ai-skills": composableAiSkillsPreviewImage,
  "draft-assembly-not-just-curation": draftAssemblyNotJustCurationPreviewImage,
  "human-review-by-default": humanReviewByDefaultPreviewImage,
  "per-project-relevance-training": perProjectRelevanceTrainingPreviewImage,
  "self-hostable-bring-your-own-models": selfHostableBringYourOwnModelsPreviewImage,
  "trend-velocity-not-trend-volume": trendVelocityNotTrendVolumePreviewImage,
  "unified-entity-profiles": unifiedEntityProfilesPreviewImage,
};
