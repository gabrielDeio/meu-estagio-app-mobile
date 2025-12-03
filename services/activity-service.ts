import {
  Activity,
  ActivityStatus,
  createActivityDto,
  getAllActivitiesDto,
} from '../src/dto/activity.dto'
import { api } from './api'

export class ActivityService {
  static async getAllActivities(payload: getAllActivitiesDto): Promise<Array<Activity>> {
    const { userId, orgId } = payload
    const response = await api.get(`/activity/${orgId}/user/${userId}`)

    return response.data
  }

  static async registerActivity(payload: createActivityDto) {
    const response = await api.post('/activity/', payload)

    return response
  }

  static async setActivityStatus(status: ActivityStatus, activityId: string) {
    const response = await api.patch(`/activity/${activityId}`, { status })

    return response
  }
}
