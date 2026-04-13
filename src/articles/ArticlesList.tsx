import "./list.sass";
import {ReactComponent as BoxSvg} from "../img/blog-box.svg";
import {Article, ARTICLES} from "./articles";
import {motion} from "motion/react";
import {AnimateFade} from "../animations";
import {Canvas} from "@react-three/fiber";
import {Environment, Html, OrbitControls} from "@react-three/drei";
import MilkyWay from "../img/2k_stars_milky_way.jpg";
import {Sun} from "../index/Canvas";
import {Bloom, EffectComposer, Vignette} from "@react-three/postprocessing";
import {useEffect, useState} from "react";
import {Reader} from "./Reader";
import {useRouter} from "../router/RouterContext";
import {Path} from "../router/router";

const ARTICLE_QUERY = "a";
const main = AnimateFade();
export default function ArticlesList() {
  const [article, setArticle] = useState<Article | null>(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if(params.has(ARTICLE_QUERY)) {
      const id = Number.parseInt(params.get(ARTICLE_QUERY)!);
      setArticle(ARTICLES[id] ?? null);
    }
  }, [setArticle]);

  useEffect(() => {
    if(!article) {
      // query param
      const params = new URLSearchParams(location.search);
      if(params.has(ARTICLE_QUERY)) {
        router.replacePage(location.pathname as Path);
      }
    } else {
      const id = ARTICLES.indexOf(article);
      router.replacePage(`${location.pathname}?${ARTICLE_QUERY}=${id}` as Path);
    }
  }, [article]);


  return <motion.main animate={main.animate} initial={main.initial} className="art-ctr">
    <Canvas camera={{position: [0,0,20]}}>
      <Environment background files={MilkyWay}/>
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
      <Sun/>
      <OrbitControls enablePan={false} enableZoom />
      <Html className="articles" zIndexRange={[100,0]} prepend center transform>
        {
          ARTICLES.map(a => <BlogBox setReading={setArticle} article={a}/>)
        }
      </Html>
    </Canvas>
    <Reader post={article} setPost={setArticle}/>
  </motion.main>
}

function BlogBox(props: { article: Article, setReading: (_: Article | null) => void }) {
  const {article, setReading, article: {name, description, thumbnail, published} } = props;

  return (
    <button className="link" onClick={() => setReading(article)}>
      <div className="blog-box">
        <img className="thumbnail" alt={`${name} thumbnail`} src={thumbnail}/>
        <div className="titles">
          <h1>
              { name }
          </h1>
          <div className="desc">
            <h3>
              { description }
            </h3>
            <p>
              { published.toDateString() }
            </p>
          </div>
        </div>
      </div>
      <BoxSvg className='box-wave'/>
    </button>
  )
}
