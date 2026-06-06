"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { categories } from "@/data/categories";
import { productImages } from "@/data/images";
import { imageLabel } from "@/lib/image-label";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [category, setCategory] = useState("Mates");
  const [image, setImage] = useState("");

  const [featured, setFeatured] = useState(false);
  const [sale, setSale] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const [discount, setDiscount] = useState(0);

  const [optionsText, setOptionsText] = useState("");

  const filteredImages = useMemo(() => {
    return productImages.filter(
      (img) => img.category === category
    );
  }, [category]);

  const generatedProduct = {
    id: 0,

    name,

    category,

    price: Number(price),

    image,

    options: optionsText
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean),

    ...(featured && {
      featured: true,
    }),

    ...(sale && {
      sale: true,
    }),

    ...(outOfStock && {
      outOfStock: true,
    }),

    ...(discount > 0 && {
      discount: Number(discount),
    }),
  };

  const resetForm = () => {
    setName("");
    setPrice(0);
    setImage("");
    setDiscount(0);
    setFeatured(false);
    setSale(false);
    setOutOfStock(false);
    setOptionsText("");
  };

  return (
    <main className="min-h-screen bg-background p-8">

      <h1 className="mb-8 text-4xl font-bold">
        Admin Quedé Verde 🌿
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">

        {/* FORM */}

        <div className="space-y-4 rounded-xl border p-6">

          <h2 className="text-2xl font-semibold">
            Nuevo Producto
          </h2>

          <div>
            <label className="mb-1 block">
              Nombre
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded border p-2 bg-transparent"
            />
          </div>

          <div>
            <label className="mb-1 block">
              Precio
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(Number(e.target.value))
              }
              className="w-full rounded border p-2 bg-transparent"
            />
          </div>

          <div>
            <label className="mb-1 block">
              Categoría
            </label>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                resetForm();
              }}
              className="w-full rounded border p-2 bg-background"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block">
              Opciones
            </label>

            <input
              placeholder="Alpaca, Negro, Premium"
              value={optionsText}
              onChange={(e) =>
                setOptionsText(e.target.value)
              }
              className="w-full rounded border p-2 bg-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={featured}
                onChange={() =>
                  setFeatured(!featured)
                }
              />
              Destacado
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sale}
                onChange={() =>
                  setSale(!sale)
                }
              />
              Oferta
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={outOfStock}
                onChange={() =>
                  setOutOfStock(!outOfStock)
                }
              />
              Agotado
            </label>

          </div>

          <div>
            <label className="mb-1 block">
              Descuento %
            </label>

            <input
              type="number"
              value={discount}
              onChange={(e) =>
                setDiscount(Number(e.target.value))
              }
              className="w-full rounded border p-2 bg-transparent"
            />
          </div>

          {image && (
            <div className="rounded border p-3">

              <p className="mb-2 text-sm opacity-70">
                Imagen seleccionada
              </p>

              <p className="mb-3 text-sm break-all">
                {image}
              </p>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    image
                  )
                }
                className="rounded bg-zinc-700 px-3 py-2 text-sm"
              >
                📋 Copiar ruta
              </button>

            </div>
          )}
        </div>

        {/* GALERIA */}

        <div className="sticky top-4 h-fit rounded-xl border p-6">

          <h2 className="mb-4 text-2xl font-semibold">
            Galería
          </h2>

          <div className="max-h-[700px] overflow-y-auto pr-2">

            <div className="grid grid-cols-2 gap-4">

              {filteredImages.map((img) => (

                <button
                  key={img.image}
                  type="button"
                  onClick={() => {
                    setImage(img.image);

                    setName(
                      imageLabel(img.image)
                    );
                  }}
                  className={`overflow-hidden rounded-lg border transition-all ${
                    image === img.image
                      ? "ring-2 ring-green-500"
                      : ""
                  }`}
                >

                  <div className="relative aspect-square">

                    <Image
                      src={img.image}
                      alt={img.image}
                      fill
                      className="object-cover"
                    />

                  </div>

                  <div className="p-2 text-xs">
                    {imageLabel(img.image)}
                  </div>

                </button>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* JSON */}

      <div className="mt-8 rounded-xl border p-6">

        <div className="mb-4 flex items-center justify-between">

          <h2 className="text-2xl font-semibold">
            JSON Generado
          </h2>

          <button
            onClick={() =>
              navigator.clipboard.writeText(
                JSON.stringify(
                  generatedProduct,
                  null,
                  2
                )
              )
            }
            className="rounded bg-green-600 px-4 py-2 text-white"
          >
            Copiar JSON
          </button>

        </div>

        <pre className="overflow-auto rounded bg-black p-4 text-sm text-green-400">
          {JSON.stringify(
            generatedProduct,
            null,
            2
          )}
        </pre>

      </div>

    </main>
  );
}