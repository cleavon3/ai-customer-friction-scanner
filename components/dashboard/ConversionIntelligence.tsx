import {
  TrendingDown,
  ShieldAlert,
  ShoppingCart,
  MessageSquareWarning,
} from "lucide-react";


const insights = [
  {
    title: "Trust Issues",
    description:
      "Many stores lack reviews, guarantees, and credibility signals.",
    icon: ShieldAlert,
  },

  {
    title: "Product Clarity",
    description:
      "Customers struggle to understand product value before purchase.",
    icon: ShoppingCart,
  },

  {
    title: "Journey Friction",
    description:
      "Navigation and checkout barriers reduce purchase confidence.",
    icon: MessageSquareWarning,
  },
];


export default function ConversionIntelligence() {

  return (

    <section className="dashboard-card">


      <div className="card-header">

        <div>

          <h2>
            Conversion Intelligence
          </h2>

          <p>
            AI analysis across scanned stores.
          </p>

        </div>

      </div>



      <div className="intelligence-summary">


        <div className="health-score">

          <span>
            Average Store Score
          </span>


          <strong>
            72/100
          </strong>


          <small>
            Based on customer trust, product confidence and journey analysis.
          </small>

        </div>



        <div className="friction-list">


          {insights.map((item)=>{

            const Icon = item.icon;


            return (

              <div
                key={item.title}
                className="friction-item"
              >

                <div className="friction-icon">

                  <Icon size={20}/>

                </div>


                <div>

                  <strong>
                    {item.title}
                  </strong>


                  <p>
                    {item.description}
                  </p>

                </div>


              </div>

            );

          })}


        </div>


      </div>


    </section>

  );

}