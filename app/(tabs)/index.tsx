import React from "react";
import { useItems } from "@/hooks/useItems";
import { ItemList } from "@/components/composite";
import { View } from "@/components/ui";

export default function Home() {
  const {
    data: items,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useItems("general");

  return (
    <View variant="padded-vertical">
      <ItemList
        data={items}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        emptyText="No items found"
      />
    </View>
  );
}
