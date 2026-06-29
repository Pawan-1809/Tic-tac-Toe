import React, { useState } from 'react'
import circle_icon from '../../assets/Circle.png'
import cross_icon from '../../assets/Cross.png'

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [isXNext, setIsXNext] = useState(true)
    const [winner, setWinner] = useState(null)

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }

    const handleClick = (index) => {
        if (board[index] || winner) return

        const newBoard = [...board]
        newBoard[index] = isXNext ? 'X' : 'O'
        setBoard(newBoard)

        const gameWinner = calculateWinner(newBoard)
        if (gameWinner) {
            setWinner(gameWinner)
        }

        setIsXNext(!isXNext)
    }

    const handleRestart = () => {
        setBoard(Array(9).fill(null))
        setIsXNext(true)
        setWinner(null)
    }

    const currentWinner = calculateWinner(board)

    return (
        <div className='text-center flex flex-col gap-5 mt-5'>
            <div className="mb-5 flex justify-center-safe gap-3">
                <h1 className='font-serif mt-14 text-white font-semibold text-5xl flex justify-center align-center'>Tic Tac Toe Game By</h1><span className='text-cyan-300 pl-5 font-serif mt-50px font-semibold text-5xl flex justify-center align-center'>Pawan</span>
            </div>
            {currentWinner && <div className='text-cyan-300 font-serif text-3xl font-semibold'>Player {currentWinner} Wins!</div>}
            <div className="flex justify-center mt-4 max-h-[80vh] overflow-hidden">
                <div className="grid grid-cols-3 gap-2">
                    {board.map((value, index) => (
                        <div
                            key={index}
                            className={`flex h-40 w-40 items-center justify-center rounded-2xl bg-gray-600 border-solid ${!currentWinner ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            onClick={() => handleClick(index)}
                        >
                            {value === 'O' && (
                                <img src={circle_icon} alt="Circle" className="h-20 w-20" />
                            )}
                            {value === 'X' && (
                                <img src={cross_icon} alt="Cross" className="h-20 w-20" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="">
                <button onClick={handleRestart} className='font-serif font-semibold w-28 h-12 border-none outline-none cursor-pointer active:scale-95 rounded-3xl bg-cyan-800 text-xl text-gray-300 mt-6 mb-12'>Restart</button>
            </div>
        </div>
    )
}

export default TicTacToe
