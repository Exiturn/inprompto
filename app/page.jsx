import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">Discover & Share</h1>
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center font-[500]">AI-Powered Prompts</span>
        <p className="desc text-center">Prompto is an AI-powered tool for the modern world to discover, create and share interesting prompts.</p>

         {/* Feed */}
         <Feed />

    </section>
  )
}

export default Home