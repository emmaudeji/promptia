import Feed from "@/components/Feed"



export default function Home() {

  return (
    <>
      <section className='w-full flex-center flex-col'>
          <h1 className='head_text text-center'>
            Spark Your Ideas With
            <br className='max-md:hidden' />
            <span className='purple_gradient text-center'> AI-Powered Prompts</span>
          </h1>
          <p className='desc text-center'>
          Empower the Modern World with an Open-Source AI Prompting Tool, Enabling Discovery, Creation, and Sharing of Creative Prompts.
          </p>
      </section>
      
      <Feed />
     
      
    </>
  )
}


