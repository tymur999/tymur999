import {Article, ARTICLES} from "./articles";
import {useState} from "react";
import "./list.sass";
import {ReactComponent as BoxSvg} from "../img/blog-box.svg";
import {Reader} from "./Reader";


export function ArticlesList() {
  const [reading, setReading] = useState<Article | null>(null);

  return <main className="art-ctr">
    <section className="spacer"/>
    <section className="articles">
      {
        ARTICLES.map(a =>
          <BlogBox key={a.name} article={a} setReading={setReading}/>
        )
      }
    </section>
    <section className="spacer"/>
    <Reader post={reading} setPost={setReading} />
  </main>
}

function BlogBox(props: { article: Article, setReading: (_: Article) => void}) {
  const {article,
    article: {name, description, thumbnail, published},
    setReading} = props;

  return (
    <button className="link" onClick={() => setReading(article)}>
      <div>
        <img className="thumbnail" alt={`${name} thumbnail`} src={thumbnail}/>
        <div className="titles">
          <h1>{name}</h1>
          <div className="desc">
            <h3>{description}</h3>
            <p>{published.toDateString()}</p>
          </div>
        </div>
      </div>
      <BoxSvg className='box-wave'/>
    </button>

  )
}
