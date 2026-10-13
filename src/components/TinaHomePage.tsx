import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function TinaHomePage(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { body } = data.page;

  if (!body) return null;

  return (
    <section className="section" style={{ paddingTop: '3rem', paddingBottom: '1rem' }}>
      <div 
        className="container max-w-2xl prose" 
        data-tina-field={tinaField(data.page, 'body')}
      >
        <TinaMarkdown content={body} />
      </div>
    </section>
  );
}
