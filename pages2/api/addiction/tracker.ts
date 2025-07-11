let addictions = {};

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(addictions);
  } else if (req.method === 'POST') {
    const update = req.body;
    Object.entries(update).forEach(([name, date]) => {
      if (date === null) {
        delete addictions[name];
      } else {
        addictions[name] = date;
      }
    });
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
