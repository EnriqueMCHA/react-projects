import { useMemo, useState } from "react";
import { SortBy, type User } from "../types.d";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";

export const useUsers = () => {
  const { data, isLoading, isError, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{
      users: User[];
      nextCursor?: number;
    }>({
      queryKey: ["users"],
      queryFn: fetchUsers,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users: User[] = data?.pages?.flatMap((page) => page.users) ?? [];

  const [showColor, setShowColor] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const toggleColor = () => {
    setShowColor(!showColor);
  };

  const handleFitlerCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCountry(event.target.value);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const restoreInitialState = async () => {
    await refetch();
  };

  const handleDelete = (email: string) => {
    // const newUsers = users.filter((user) => user.email !== email);
    // setUsers(newUsers);
  };

  const filteredUsers = useMemo(
    () =>
      filterCountry != null && filterCountry.length > 0
        ? users.filter((user: User) =>
            user.location.country
              .toLowerCase()
              .includes(filterCountry.toLowerCase())
          )
        : users,
    [filterCountry, users]
  );

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    users,
    sorting,
    showColor,
    toggleColor,
    toggleSortByCountry,
    restoreInitialState,
    handleFitlerCountry,
    handleDelete,
    filteredUsers,
    sortedUsers,
  };
};
