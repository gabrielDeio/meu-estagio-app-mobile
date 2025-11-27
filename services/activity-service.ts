import { Activity, getAllActivitiesDto } from '../src/dto/activity.dto'
import { api } from './api'

export class ActivityService {
  static async getAllActivities(payload: getAllActivitiesDto): Promise<Array<Activity>> {
    const { userId, orgId } = payload
    const response = await api.get(`/activity/${orgId}/user/${userId}`)

    return response.data
  }
}
