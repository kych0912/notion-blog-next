import axios from "axios";

export async function getLatestPosts(pageParam: number = 1) {
  const res = await axios.get(`/api/post/latest?page=${pageParam}`);

  return res.data;
}

export async function deletePost(id: string) {
  const res = await axios.delete(`/api/post/delete/${id}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getRecordMap(pageId: string) {
  const res = await axios.get(`/api/notion/page?pageId=${pageId}`);
  return res.data;
}
