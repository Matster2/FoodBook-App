import { useContext, useState } from 'react';
import { TagContext } from 'src/contexts/TagContext';
import useAPI from 'src/hooks/useAPI';

export default () => {
  const { tags, setTags } = useContext(TagContext);
  const [loading, setLoading] = useState(false);
  const api = useAPI();

  const fetch = async () => {
    setLoading(true);
    try {      
      const { data } = await api.getTags({
        hidden: false,
      });
      setTags(data.results);
    } catch {
      console.log('error fetching tags');
    }
    setLoading(false);
  };

  return {
    loading,
    tags,
    setTags,
    fetch
  };
};