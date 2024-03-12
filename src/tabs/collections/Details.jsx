
const Details = ({ collection }) => {
  const navigate = useNavigate();
  /* Rendering */
  return (
    <CollectionForm
      collection={collection}
      onSubmit={() => navigate("/admin/collections")}
      admin={true}
    />
  )
}

export default Details;