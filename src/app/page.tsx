"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { getAllModelsByYear } from "./services/carQuery/makes";
import { getTrims } from "./services/carQuery/trims";
import { predict } from "./services/naiveBayes/predict";

export default function Home() {
  const [buying, setBuying] = useState("");
  const [maint, setMaint] = useState("");
  const [doors, setDoors] = useState<number>();
  const [persons, setPersons] = useState<number>();
  const [lug_boot, setLug_boot] = useState("");
  const [safety, setSafety] = useState("");
  const [classification, setClassification] = useState("");

  const [models, setModels] = useState<any[]>([]);
  useEffect(() => {
    getTrims();
  }, []);

  const mapClassification = {
    "unacc": "Inaceitável",
    "acc": "Aceitável",
    "good": "Bom",
    "vgood": "Ótimo"
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(buying, maint, doors, persons, lug_boot, safety);
    if(buying.length > 0 && maint.length > 0 && doors && persons && lug_boot.length > 0 && safety.length > 0 && doors > 1 && persons !== 3 && persons > 1) {
      predict({buying, doors, lug_boot, maint, persons, safety}).then((response) => {
        setClassification(response);
      })
    }else {
      alert("Parâmetros inválidos!")
    }
  }

  const resetFilters = () => {
    setBuying("");
    setMaint("");
    setDoors(undefined);
    setPersons(undefined);
    setLug_boot("");
    setSafety("");
    setClassification("");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <div className="flex flex-1 flex-col gap-6 bg-white p-8 rounded-md shadow-md w-[520px]">
        <span className="font-bold text-center text-lg">
          Avaliação de carros
        </span>
        <span className="text-center">
          Responda o formulário para avaliar um carro com base no seu preço,
          preço de manutenção, número de portas, capacidade, tamanho do porta
          malas e segurança.
        </span>
        <span className="text-center">Você pode acessar informações de carros no site da  <a className="text-blue-600 hover:opacity-80" href="https://www.icarros.com.br/principal/index.jsp">iCarros</a>.</span>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="buying">
              Preço
            </label>
            <select
              value={buying}
              onChange={(e) => setBuying(e.target.value)}
              className="border border-solid border-gray-300 p-2"
              id="buying"
              name="buying"
            >
              <option value=""></option>
              <option value="vhigh">Muito caro</option>
              <option value="high">Caro</option>
              <option value="med">Médio</option>
              <option value="low">Barato</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="maint">
              Preço da manutenção
            </label>
            <select
              value={maint}
              onChange={(e) => setMaint(e.target.value)}
              id="maint"
              name="maint"
              className="border border-solid border-gray-300 p-2"
            >
              <option value=""></option>
              <option value="vhigh">Muito caro</option>
              <option value="high">Caro</option>
              <option value="med">Médio</option>
              <option value="low">Barato</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="doors">
              Número de portas
            </label>
            <input
              value={doors ?? 0}
              onChange={(e) => setDoors(parseInt(e.target.value))}
              id="doors"
              name="doors"
              className="border border-solid border-gray-300 p-2"
              type="number"
              min={2}
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="persons">
              Capacidade de pessoas
            </label>
            <input
            value={persons ?? 0}
              onChange={(e) => setPersons(parseInt(e.target.value))}
              id="persons"
              name="persons"
              className="border border-solid border-gray-300 p-2"
              type="number"
              min={2}
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor="lug_boot">
              Tamanho do porta malas
            </label>
            <select
              className="border border-solid border-gray-300 p-2"
              id="lug_boot"
              name="lug_boot"
              onChange={(e) => setLug_boot(e.target.value)}
              value={lug_boot}
            >
              <option value=""></option>
              <option value="small">Mala pequema</option>
              <option value="med">Mala média</option>
              <option value="big">Mala grande</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="safety">Segurança</label>
            <select
              className="border border-solid border-gray-300 p-2"
              id="safety"
              name="safety"
              onChange={(e) => setSafety(e.target.value)}
              value={safety}
            >
              <option value=""></option>
              <option value="low">Segurança baixa</option>
              <option value="med">Segurança média</option>
              <option value="high">Segurança alta</option>
            </select>
          </div>
          </div>
          <div className="flex flex-row gap-4 flex-1 w-full">
          <button type='button' onClick={resetFilters} className="p-3 border-pink-400 border border-solid rounded-md text-black font-semibold flex-1">Limpar campos</button>
          <button type='submit' className="p-3 bg-pink-400 rounded-md text-white font-bold flex-1">Avaliar carro</button>
          </div>
        </form>
       {classification.length > 0 &&  <div className="flex flex-col bg-white rounded-md p-6">
          <span className="font-bold text-center">Resultado da avaliação</span>
          <span className="text-center">O carro informado é: <b>{mapClassification[classification]}</b></span>
        </div>}
      </div>
    </main>
  );
}
