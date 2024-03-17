import { Tab, Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import DetailsTab from 'src/admin/tabs/collections/Details';
import RecipesTab from 'src/admin/tabs/collections/Recipes';
import api from 'src/api';
import PageLayout from 'src/layouts/PageLayout';
import { Operation } from 'src/types';
import { isUndefined } from 'src/utils/utils';

type CollectionParams = {
  id: string | undefined
}

enum CollectionTab {
  Info,
  Translations,
  Recipes
}

const Collection = () => {
  const { t } = useTranslation();
  const { id } = useParams<CollectionParams>();

  const mode = isUndefined(id) ? Operation.Create : Operation.Update;

  const [tabs] = useState(() => [
    { value: CollectionTab.Info, label: "Info" },
    ...(mode === Operation.Update) ? [
      { value: CollectionTab.Translations, label: "Translations" },
      { value: CollectionTab.Recipes, label: "Recipes" }
    ] : []
  ]);

  const [currentTab, setCurrentTab] = useState(CollectionTab.Info);

  const {
    isFetching: loadingCollection,
    data: collection
  } = useQuery({
    queryKey: ["collection", id],
    queryFn: () => api.collections.getCollection(id!),
    enabled: !isUndefined(id)
  })

  /* Handlers */
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };


  /* Rendering */
  return (
    <PageLayout
      title={`${mode === Operation.Create ? t("common.words.actions.add") : t("common.words.actions.update")} ${t("types.collection.name")}`}
      loading={loadingCollection}
    >
      {!loadingCollection && (
        <>
          <Tabs
            sx={{ mb: 2 }}
            value={currentTab}
            onChange={handleTabChange}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
              />
            ))}
          </Tabs>

          {currentTab === CollectionTab.Info && (
            <DetailsTab
              collection={collection}
            />
          )}
          {currentTab === CollectionTab.Recipes && (
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