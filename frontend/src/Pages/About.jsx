import React from 'react'
import about1 from "../assets/about1.png"
import about2 from "../assets/about2.png"
import about3 from "../assets/about3.png"
import about4 from "../assets/about4.png"
import SornerName from "../assets/sornerNameLogo.png"

export default function About() {
  return (
    <div className='bg-black text-white h-full w-screen flex flex-col place-content-center items-center gap-[30px]'>
        <div className='relative px-[20px] h-[620px] flex flex-col items-center gap-5  place-content-center'> 
            <div className='absolue flex place-content-center gap-5'>
                <img  className=" object-cover w-[15%]  top-[20px] " src={about1}/>
                <img className=" object-cover w-[20%]  top-[50px] " src={about2}/>
            </div> 
            <div className='absolue flex place-content-center gap-7 '>
                <img className=" object-cover w-[25%] top-[50px] " src={about3}/>
                <img className=" object-cover  w-[15%] " src={about4}/>
            </div>
        </div>
        <div className='mb-[90px] text-justify flex flex-col gap-7 items-center '>
            <img className="w-[50%]" src={SornerName} />
            <p className='p-6 w-[750px] text-2xl'>
            Somos una marca independiente que diseña prendas únicas y de edición limitada, inspiradas en temáticas frescas y actuales. Cada pieza refleja un proceso creativo auténtico, explorando desde el arte urbano hasta estilos alternativos para quienes buscan expresar su individualidad. Sorner celebra la pasión por lo exclusivo y lo diferente, conectando con espíritus jóvenes que valoran lo original en cada detalle.
            </p>
            <p className='p-6 w-[850px] text-2xl bg-[#C40F0F] '>
            Te invitamos a formar parte de esta experiencia creativa y a explorar nuestras colecciones, diseñadas para quienes ven el mundo como un lienzo lleno de posibilidades. Descubre tu lado más auténtico con Sorner, porque ser diferente nunca pasa de moda.
            </p>
        </div>
    </div>
  )
}
