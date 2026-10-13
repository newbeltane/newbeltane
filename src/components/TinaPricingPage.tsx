import { tinaField, useTina } from "tinacms/dist/react";

export default function TinaPricingPage(props: any) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const { headline, intro, pricingTiers, adHoc } = data.page;

  return (
    <>
      <section className="section-sm page-hero">
        <div className="container">
          <div className="text-center" style={{ textAlign: 'center' }}>
            <span className="eyebrow">Pricing</span>
            <h1 
              className="page-title" 
              data-tina-field={tinaField(data.page, 'headline')}
              dangerouslySetInnerHTML={{ __html: headline || '' }}
            />
            <p 
              className="lead" 
              style={{ maxWidth: '60ch', margin: '0 auto' }} 
              data-tina-field={tinaField(data.page, 'intro')}
            >
              {intro}
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="pricing-flex-grid">
            {pricingTiers?.map((tier: any, i: number) => (
              <div key={i} className={`card pricing-card ${tier.highlight ? 'highlight' : ''}`} data-tina-field={tinaField(tier)}>
                <h2 className="tier-name" data-tina-field={tinaField(tier, 'name')}>{tier.name}</h2>
                <div className="tier-price" data-tina-field={tinaField(tier, 'price')}>{tier.price}</div>
                <p className="tier-desc" data-tina-field={tinaField(tier, 'description')}>{tier.description}</p>
                <ul className="tier-features" data-tina-field={tinaField(tier, 'features')}>
                  {tier.features?.map((feature: string, j: number) => (
                    <li key={j}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-icon"><path d="M20 6L9 17l-5-5"/></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="/quote/" className="btn btn-primary" data-tina-field={tinaField(tier, 'cta')}>{tier.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {adHoc && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="ad-hoc-box" data-tina-field={tinaField(data.page, 'adHoc')}>
              <h3 data-tina-field={tinaField(adHoc, 'title')}>{adHoc.title}</h3>
              <div 
                data-tina-field={tinaField(adHoc, 'content')}
                dangerouslySetInnerHTML={{ __html: adHoc.content || '' }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
