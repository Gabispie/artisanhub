import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const products = [
    {
      id: "1",
      name: "Vaso de Barro Marajoara",
      description: "Vaso artesanal inspirado na cerâmica da Ilha de Marajó, confeccionado à mão com argila local e pigmentos naturais. Técnica ancestral transmitida por gerações.",
      price: 180.0,
      category: "Cerâmica",
      artisan: "Mestre Raimundo",
      rating: 4.8,
      image: "https://picsum.photos/seed/ceramics1/400/500",
      status: "approved"
    },
    {
      id: "2",
      name: "Rede de Dormir em Algodão",
      description: "Rede tecida artesanalmente no Ceará, ultra resistente e confortável. Algodão 100% natural, tingimento com extratos vegetais.",
      price: 250.0,
      category: "Têxtil",
      artisan: "Maria das Rendas",
      rating: 4.9,
      image: "https://picsum.photos/seed/textile1/400/500",
      status: "approved"
    },
    {
      id: "3",
      name: "Escultura em Madeira de Imbuia",
      description: "Escultura entalhada à mão representando a fauna brasileira. Imbuia nobre certificada de reflorestamento, acabamento com cera de carnaúba.",
      price: 420.0,
      category: "Escultura",
      artisan: "João do Entalhe",
      rating: 5.0,
      image: "https://picsum.photos/seed/wood1/400/500",
      status: "approved"
    },
    {
      id: "4",
      name: "Tapete de Tear Nordestino",
      description: "Tapete produzido em tear manual com fios de algodão cru e lã de ovelha. Motivos geométricos típicos do sertão nordestino.",
      price: 320.0,
      category: "Têxtil",
      artisan: "Francisca Bezerra",
      rating: 4.7,
      image: "https://picsum.photos/seed/tapete2/400/500",
      status: "approved"
    },
    {
      id: "5",
      name: "Colar de Sementes Amazônicas",
      description: "Peça exclusiva feita com sementes nativas da Amazônia: açaí, tucumã e jarina. Design contemporâneo aliado à identidade indígena.",
      price: 95.0,
      category: "Jóias",
      artisan: "Aldeia Yawanapi",
      rating: 4.9,
      image: "https://picsum.photos/seed/joias3/400/500",
      status: "approved"
    },
    {
      id: "6",
      name: "Bolsa de Couro Curtido Vegetal",
      description: "Bolsa artesanal em couro bovino curtido com tanino vegetal extraído da casca de angico. Costura manual, alça regulável.",
      price: 380.0,
      category: "Couro",
      artisan: "Sebastião Seleiro",
      rating: 4.6,
      image: "https://picsum.photos/seed/couro4/400/500",
      status: "approved"
    },
    {
      id: "7",
      name: "Bordado Filé Alagoano",
      description: "Bordado em filé produzido em Marechal Deodoro, Alagoas. Técnica reconhecida como patrimônio cultural imaterial brasileiro.",
      price: 210.0,
      category: "Bordado",
      artisan: "Dona Iraci Lopes",
      rating: 4.8,
      image: "https://picsum.photos/seed/bordado5/400/500",
      status: "approved"
    },
    {
      id: "8",
      name: "Pote de Barro Capixaba",
      description: "Pote utilitário e decorativo em barro negro do Espírito Santo, feito à mão com a técnica das paneleiras de Goiabeiras.",
      price: 145.0,
      category: "Cerâmica",
      artisan: "Ana Paneleira",
      rating: 4.7,
      image: "https://picsum.photos/seed/ceramica6/400/500",
      status: "approved"
    },
    {
      id: "9",
      name: "Máscara Entalhada do Nordeste",
      description: "Máscara decorativa entalhada em madeira de cedro rosado, representando figuras do imaginário popular nordestino. Pintura natural.",
      price: 175.0,
      category: "Madeira",
      artisan: "Zé Caboclo",
      rating: 4.5,
      image: "https://picsum.photos/seed/mascara7/400/500",
      status: "approved"
    },
    {
      id: "10",
      name: "Brincos de Filigrana em Prata",
      description: "Brincos em filigrana de prata 950, técnica tradicional da região de Caraíbas, Bahia. Cada par leva 12 horas de trabalho artesanal.",
      price: 290.0,
      category: "Jóias",
      artisan: "Mestra Cida Filigrana",
      rating: 5.0,
      image: "https://picsum.photos/seed/prata8/400/500",
      status: "approved"
    },
    {
      id: "11",
      name: "Chapéu de Palha de Carnaúba",
      description: "Chapéu trançado com palha de carnaúba selecionada do Piauí. Ventilado, resistente e com proteção UV natural. Produto certificado.",
      price: 120.0,
      category: "Têxtil",
      artisan: "Pedro Trançador",
      rating: 4.6,
      image: "https://picsum.photos/seed/chapeu9/400/500",
      status: "approved"
    },
    {
      id: "12",
      name: "Escultura Guaraná Amazônica",
      description: "Escultura em cerâmica representando a planta sagrada guaraná, símbolo da Amazônia indígena. Esmaltação natural com pigmentos de barro.",
      price: 260.0,
      category: "Cerâmica",
      artisan: "Comunidade Sateré-Mawé",
      rating: 4.8,
      image: "https://picsum.photos/seed/guarana10/400/500",
      status: "approved"
    }
  ];

  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const newProduct = { ...req.body, id: String(products.length + 1), status: "pending" };
    products.push(newProduct);
    res.status(201).json(newProduct);
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ArtisanHub rodando em http://localhost:${PORT}`);
  });
}

startServer();
