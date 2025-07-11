
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { text } = req.body;

  let analysis = 'neutral';
  if (text.toLowerCase().includes('happy')) analysis = 'happy';
  if (text.toLowerCase().includes('sad')) analysis = 'sad';
  if (text.toLowerCase().includes('angry')) analysis = 'angry';
  res.status(200).json({ analysis });
}
