import api from "@/configs/axios";

class MatchingService {
  getMatchingResults = async (userInfo: any) => {
    return await api.post("matching", {
      ...userInfo,
      employeeID: userInfo.employeeNumber,
      skills: userInfo.skills?.join(', ')
    });
  };
}

export const matchingService = new MatchingService();
