import { useNavigate } from "react-router-dom";
import CollectionForm from 'src/admin/forms/CollectionForm';

const Details = ({ collection }) => {
  const navigate = useNavigate();

  /* Rendering */
  return (
    <CollectionForm
      collection={collection}
      onSuccess={() => navigate("/admin/collections")}
    />
  )
}

export default Details;