const URL_FACTS = "https://catfact.ninja/fact";
const URL_CATS = "https://cataas.com/cat";

export const getFactCat = async () => {

  try {

    const getCatFactResponse = await fetch(`${URL_FACTS}`);
    const getFact = await getCatFactResponse.json();

    return getFact;

  } catch (error) {

    return error;
  }
}

export const getCatByFact = async ({ word }) => {

  try {

    const getCatsByFactResponse = await fetch(`${URL_CATS}/says/${word}?json=true`);
    const getCats = await getCatsByFactResponse.json();
    const url = `${URL_CATS}/${getCats._id}/says/${word}`;

    return url;

  } catch (error) {

    return error;
  }
}