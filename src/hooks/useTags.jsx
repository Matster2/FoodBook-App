import { TagContext } from 'contexts/TagContext';
import useAPI from 'hooks/useAPI';
import { useContext } from 'react';

export default () => {
  const { tags, setTags } = useContext(TagContext);
  const api = useAPI();

  const fetch = async () => {
    try {
      const { data } = await api.getTags();
      setTags(data.results);
    } catch {
      console.log('error fetching tags');
    }
  };

  return {
    tags,
    setTags,
    fetch
  };
};