import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "../config";
import type { ContentItem } from "../components/ui/default";
import { useNavigate } from "react-router-dom";
import { toast } from "./use-toast";

export default function useContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [noContentMessage, setNoContentMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const hasShownAuthError = useRef(false);

  const baseUrl = API_BASE_URL.endsWith("/")
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = () => {
    axios
      .get(`${baseUrl}/api/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.content && Array.isArray(response.data.content)) {
          setContents(
            response.data.content
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((item: ContentItem) => ({
                _id: item._id,
                title: item.title,
                note: item.note,
                tags: item.tags,
                link: item.link,
                createdAt: item.createdAt,
              }))
          );
          setNoContentMessage("");
        } else if (response.data.noContent) {
          setContents([]);
          setNoContentMessage(response.data.noContent);
        }
        setLoading(false);
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.status === 401 &&
          !hasShownAuthError.current
        ) {
          hasShownAuthError.current = true;
          toast("Please sign in to continue", "error");
          navigate("/auth");
        } else {
          console.error("error fetching content: ", e);
        }
        setLoading(false);
      });
  };

  // Function to refresh content (alternative approach)
  const refreshContents = () => {
    setLoading(true);
    fetchContents();
  };

  return {
    contents,
    noContentMessage,
    loading,
    refreshContents,
  };
}
