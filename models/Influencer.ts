import { getDuplicatesRefinement } from 'libs/utils/zod'
import { z } from 'zod'
import { IdSchema } from '../../generic/models/Id'
import { SocialChannelsSchema } from '../../social/models/SocialChannel'

export const InfluencerSchema = z.object({
  id: IdSchema,
  channels: SocialChannelsSchema,
}).describe('Influencer')

export const InfluencersSchema = z.array(InfluencerSchema)
  .superRefine(getDuplicatesRefinement('Influencer', parseInfluencerUid))

export const InfluencerUidSchema = InfluencerSchema.pick({
  id: true,
})

export type Influencer = z.infer<typeof InfluencerSchema>

export type InfluencerUid = z.infer<typeof InfluencerUidSchema>

export function parseInfluencer(influencer: Influencer): Influencer {
  return InfluencerSchema.parse(influencer)
}

export function parseInfluencers(influencers: Influencer[]): Influencer[] {
  return InfluencersSchema.parse(influencers)
}

export function parseInfluencerUid(influencerUid: InfluencerUid): InfluencerUid {
  return InfluencerUidSchema.parse(influencerUid)
}
