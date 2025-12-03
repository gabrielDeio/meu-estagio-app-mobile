import { api } from './api'

export class OrganizationService {
  static async getOrgSupervisor(orgId: string) {
    const response = await api.get(`/organization/${orgId}/supervisor`)

    return response.data
  }

  static async getOrganization(orgId: string) {
    const response = await api.get(`/organization/${orgId}`)

    return response.data
  }
}
