'use client';
import {
    MdOutlineDelete,
    MdRadioButtonUnchecked,
    MdRadioButtonChecked,
} from 'react-icons/md';
import { IoIosAdd } from 'react-icons/io';
import '../styles/Home.css';
import { useEffect, useState } from 'react';

export default function Home() {
    const [newList, setNewList] = useState(false);
    const [color, setColor] = useState(localStorage.getItem('savedColor') || 'rgb(234,88,12)');
    const [title, setTitle] = useState('');

    const [list, setList] = useState(() => {
        const storedList = localStorage.getItem('reminders');
        if (storedList) {
            return JSON.parse(storedList);
        } else {
            return [
                { id: 1, titulo: 'Correr' },
                { id: 2, titulo: 'Arrumar o Quarto' },
                { id: 3, titulo: 'Lavar a Louça' },
            ];
        }
    });

    useEffect(() => {
        localStorage.setItem('reminders', JSON.stringify(list));
        localStorage.setItem('savedColor', color); 
    }, [list, color]);

    function handleNewReminder() {
        setNewList(true);
    }
    function handleChangeColor(colorAtual) {
        setColor(colorAtual);
    }
    const handleNewList = () => {
        const newObjet = [
            ...list,
            {
                id: Math.floor(Math.random() * 10000),
                titulo: title,
            },
        ];
        setList(newObjet);
    };
    const handleCloserNewList = (e) => {
        e.preventDefault();

        if (!title) {
            setNewList(false);
            return;
        }
        setTitle('');

        handleNewList(title);
        setNewList(false);
    };
    const handleDelete = (userId) => {
        const filter = list.filter((user) => user.id !== userId);
        setList(filter);
    };
    const handleComplete = (userId) => {
        const filter = [...list];
        filter.map((user) =>
            user.id === userId ? (user.complete = !user.complete) : user
        );
        setList(filter);
    };

    return (
        <main className="bg-[#162c46] min-h-screen flex justify-center p-2">
            <div
                className="w-[400px] h-[500px] bg-white rounded-xl mt-4 p-3 relative"
                id="container"
            >
                <h1
                    className="font-extrabold text-2xl"
                    style={{ color: color }}
                >
                    Lembretes
                </h1>
                {list.map((lista) => (
                    <div className="m-3 mt-2 relative flex">
                        {lista.complete ? (
                            <span>
                                <MdRadioButtonChecked
                                    onClick={() => handleComplete(lista.id)}
                                    size={25}
                                    className="cursor-pointer mr-2"
                                />
                            </span>
                        ) : (
                            <span>
                                <MdRadioButtonUnchecked
                                    onClick={() => handleComplete(lista.id)}
                                    size={25}
                                    className="cursor-pointer mr-2"
                                />
                            </span>
                        )}
                        <h2
                            className="border-b-[1px] capitalize border-solid border-slate-400 pb-0.5 mr-6"
                            style={{
                                textDecoration: lista.complete
                                    ? 'line-through'
                                    : '',
                                color: lista.complete ? '#ccc' : '',
                            }}
                        >
                            {lista.titulo}
                        </h2>
                        <span
                            onClick={() => handleDelete(lista.id)}
                            className="absolute right-0 cursor-pointer"
                        >
                            <MdOutlineDelete size={25} />
                        </span>
                    </div>
                ))}

                <div
                    onClick={handleNewReminder}
                    id="new-list"
                    className="absolute bottom-4 left-2 flex justify-center items-center hover:bg-orange-300 duration-500 rounded-md pr-1.5 pt-1 cursor-pointer"
                >
                    <span id="span-mais">
                        <IoIosAdd
                            size={25}
                            className=""
                            style={{ color: color }}
                        />
                    </span>
                    <h2
                        id="h2-new-list"
                        className="duration-500"
                        style={{ color: color }}
                    >
                        Novo Lembrete
                    </h2>
                </div>
            </div>

            {newList ? (
                <div
                    className="w-[400px] h-[500px] absolute rounded-xl mt-4 p-3 z-10"
                    id="container-new-list"
                    style={{ backgroundColor: color }}
                >
                    <div
                        id="div-cores"
                        className="relative top-1 left-0 right-0 flex gap-[10px] justify-center mb-[20px]"
                    >
                        <h1
                            className="bg-orange-600 w-[40px] h-[40px] rounded-[50%] cursor-pointer"
                            onClick={() => handleChangeColor('rgb(234,88,12)')}
                        ></h1>
                        <h1
                            className="bg-red-600 w-[40px] h-[40px] rounded-[50%] cursor-pointer"
                            onClick={() => handleChangeColor('rgb(220 38 38)')}
                        ></h1>
                        <h1
                            className="bg-green-600 w-[40px] h-[40px] rounded-[50%] cursor-pointer"
                            onClick={() => handleChangeColor('rgb(22 163 74)')}
                        ></h1>
                        <h1
                            className="bg-[#2596be] w-[40px] h-[40px] rounded-[50%] cursor-pointer"
                            onClick={() => handleChangeColor('rgb(37 150 190)')}
                        ></h1>
                    </div>

                    <form onSubmit={handleCloserNewList}>
                        <label
                            htmlFor="search"
                            id="label-titulo bg-transparent"
                            className="text-xl "
                        >
                            Digite o Título da Tarefa
                        </label>
                        <input
                            type="search"
                            id="search"
                            className="bg-transparent rounded-md border-b-2 p-2 pb-1 mt-2 text-white text-lg placeholder:text-xl  placeholder:text-white outline-none"
                            placeholder="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute bottom-4 left-20 right-20 bg-[#162c46] text-white rounded-md p-1"
                        >
                            Concluido
                        </button>
                    </form>
                </div>
            ) : (
                <div className="hidden"></div>
            )}
        </main>
    );
}
