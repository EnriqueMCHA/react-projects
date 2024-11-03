import { useEffect, useState } from "react";
import { getCatByFact, getFactCat } from "../services/michi";

const useCatFact = () => {

  const [cat, setCat] = useState("");
  const [isLoadingGetCat, setIsLoadingGetCat] = useState(false);

  const getCat = async () => {

    setIsLoadingGetCat(true);

    const getFact = await getFactCat();
    const firstWord = getFact.fact.split(" ", 3).join(" ");

    const getCatImg = await getCatByFact({ word: firstWord });

    setCat(getCatImg);
    setIsLoadingGetCat(false);
  }

  const handleSearch = async ({ searchValue }) => {

    setIsLoadingGetCat(true);

    const getCatImg = await getCatByFact({ word: searchValue });

    setCat(getCatImg);
    setIsLoadingGetCat(false);
  }

  useEffect(() => { getCat(); }, [])

  return {
    cat,
    isLoadingGetCat,
    getCat,
    handleSearch
  }
}

export default useCatFact;




