import { Link, routes } from "@redwoodjs/router"
import { Post } from "types/graphql"

interface Props {
  article: Post
}

const Article = ({ article }: Props) => {
  return (
    <article>
      <header>
        <h2>
          <Link to={routes.article({ id: article.id})}>{article.title}</Link>
        </h2>
      </header>
      <div>{article.body}</div>
      <div>Posted at: {article.createdAt}</div>
      <p>{'Find me in ./web/src/components/Article/Article.tsx'}</p>
    </article>
  )
}

export default Article
