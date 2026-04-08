import {useArticle} from "./ArticleContext";
import "./list.sass";
import {ReactComponent as BoxSvg} from "../img/blog-box.svg";
import {Reader} from "./Reader";
import {Article, ARTICLES} from "./articles";


export function ArticlesList() {
  return <main className="art-ctr">
    <section className="spacer"/>
    <section className="articles">
      {
        ARTICLES.map(a =>
          <BlogBox key={a.name} article={a} />
        )
      }
    </section>
    <section className="spacer"/>
    <Reader/>
  </main>
}

function BlogBox(props: { article: Article }) {
  const {article, article: {name, description, thumbnail, published} } = props;
  const [, setReading] = useArticle();

  return (
    <button className="link" onClick={() => setReading(article)}>
      <div>
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
