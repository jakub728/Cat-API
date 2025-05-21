export const catObjects = (req, res) => {
  async function fetchCats() {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${process.env.KEY}`
      );

      if (response.ok) {
        const data = await response.json();

        res.status(200).json(data);
      } else {
        throw new Error("Could not fetch");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  fetchCats();
};

export const catPhotos = (req, res) => {
  async function fetchCats() {
    try {
      const { input } = req.params;
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${input}&api_key=${process.env.KEY}`
      );

      if (response.ok) {
        const result = await response.json();

        if (result.length === 0) {
          return res.status(404).json({ error: "No cats found." });
        }
        const photos = result.map((cat) => cat.url);
        res.status(200).json(photos);
      } else {
        throw new Error("Could not fetch");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  fetchCats();
};
