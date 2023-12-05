import Section from '@/Components/Section';


export default function MainHeader(props) {
    return (
      <>
        <header className='bg-primary fixed t-0 w-full z-20 font-montserrat'>
          {props.children}
        </header>
      </>
    )
}
