import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface ContentItem {
  id: string;
  title: string;
  note?: string;
  tags?: string[];
  link: string;
}

export default function useContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [noContentMessage, setNoContentMessage] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = () => {
    axios
      .get(`${BACKEND_URL}api/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.content && Array.isArray(response.data.content)) {
          setContents(response.data.content);
          setNoContentMessage("");
        } else if (response.data.noContent) {
          setContents([]);
          setNoContentMessage(response.data.noContent);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error("error fetching content: ", e);
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
