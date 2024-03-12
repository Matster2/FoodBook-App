import { Tab, Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import PageLayout from 'src/layouts/PageLayout';
import RecipesTab from 'src/tabs/collections/Recipes';
import DetailsTab from 'src/tabs/collections/Details';

const tabs = {
  info: "details",
  translations: "translations",
  recipes: "recipes",
}

const Collection = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [currentTab, setCurrentTab] = useState(tabs.info);

  const {
    isFetched: hasFetchedCollection,
    data: collection
  } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => api.getCollection(id)
  })

  /* Handlers */
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  /* Rendering */
  return (
    <PageLayout
      title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.collection.name")}`}
      loading={hasFetchedCollection}
    >
      {hasFetchedCollection && (
        <>
          <Tabs
            sx={{ mb: 2 }}
            value={currentTab}
            onChange={handleTabChange}
          >
            <Tab
              label="Details"
              value={tabs.details}
            />
            {/* <Tab
                label="Translations"
                value={tabs.translations}
              /> */}
            <Tab
              label="Recipes"
              value={tabs.recipes}
            />
          </Tabs>

          {currentTab === tabs.details && (
            <DetailsTab
              collection={collection}
            />
          )}
          {currentTab === tabs.recipes && (
            <RecipesTab
              collection={collection}
            />
          )}
        </>
      )}
    </PageLayout>
  );
};


export default Collection;