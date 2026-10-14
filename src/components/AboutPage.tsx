import React from "react";
import { useTina, tinaField } from "tinacms/dist/react";

interface AboutPageProps {
  query: string;
  variables: object;
  data: any;
}

export default function AboutPage(props: AboutPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;

  return (
    <>
      <section className="section-sm page-hero">
        <div className="container about-intro">
          <div>
            <span data-tina-field={tinaField(page, "eyebrow")} className="eyebrow">
              {page.eyebrow}
            </span>
            <h1 
              data-tina-field={tinaField(page, "heroTitle")} 
              className="page-title"
              dangerouslySetInnerHTML={{ __html: page.heroTitle }} 
            />
            <p data-tina-field={tinaField(page, "heroLead1")} className="lead">
              {page.heroLead1}
            </p>
            <p 
              data-tina-field={tinaField(page, "heroLead2")} 
              className="lead"
              dangerouslySetInnerHTML={{ __html: page.heroLead2 }}
            />
          </div>

          <div className="intro-visual" aria-hidden="true">
            <div className="avatar-card card">
              <img 
                data-tina-field={tinaField(page, "avatarImage")} 
                src={page.avatarImage} 
                alt={page.avatarName} 
                className="avatar-photo" 
              />
              <p data-tina-field={tinaField(page, "avatarName")} className="avatar-name">
                {page.avatarName}
              </p>
              <p data-tina-field={tinaField(page, "avatarRole")} className="avatar-role">
                {page.avatarRole}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Tech stack</span>
            <h2 className="section-title">Tools I build with</h2>
          </div>
          <ul data-tina-field={tinaField(page, "techStack")} className="stack">
            {page.techStack?.map((t: string, index: number) => (
              <li key={index} className="stack-badge">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How I work</span>
            <h2 className="section-title">What you can expect</h2>
          </div>
          <div data-tina-field={tinaField(page, "values")} className="grid grid-2">
            {page.values?.map((v: any, index: number) => (
              <article key={index} className="card value">
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2 data-tina-field={tinaField(page, "ctaHeadline")}>{page.ctaHeadline}</h2>
              <p data-tina-field={tinaField(page, "ctaSubtext")}>{page.ctaSubtext}</p>
            </div>
            <a href="/quote/" className="btn btn-primary">
              Get a Quote <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
