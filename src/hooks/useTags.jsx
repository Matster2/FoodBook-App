import { TagContext } from 'contexts/TagContext';
import useAPI from 'hooks/useAPI';
import { useContext, useState } from 'react';

export default () => {
  const { tags, setTags } = useContext(TagContext);
  const [loading, setLoading] = useState(false);
  const api = useAPI();

  const fetch = async () => {
    setLoading(true);
    try {      
      const { data } = await api.getCollections();
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