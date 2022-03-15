import { connect } from "react-redux";
import React from 'react'


class HomeStart extends React.Component {

  constructor(props) {
    super(props);
    this.goAppPage = this.goAppPage.bind(this);
  }

  goAppPage() {
    window.open("/app");
  }
  render() {
    return (
      <>
        <section id="section-started">
          < div id="started-content" className="container mx-auto" >
            <div className="lifetime-title">
              <div className="lifetime-title-main">
                <h2 className="headTwo">Start Earning Rewards</h2>
              </div>
              <button className="action-btn btn mobile-hidden" onClick={this.goAppPage}>Try it</button>
            </div>

            <div className="flex justify-between card-action-container">
              <div className="card-action shadow">
                <div className="badge-title c-w fs-20">
                  <div className="yellow-circle">1</div>
                  buy fire
                </div>
                <p data-nsfw-filter-status="swf" className="c-purple">
                  $FIRE is available on the <span className="phxColor">Avalanche Network</span>.  You can swap AVAX for $FIRE on Pangolin and Trader&nbsp;Joe.
                </p>
              </div>
              <div className="card-action shadow">
                <div className="badge-title c-w fs-20">
                  <div className="yellow-circle">2</div>
                  build nest
                </div>
                <p data-nsfw-filter-status="swf" className="c-purple">
                  A Phoenix-Nest costs only <span className="phxColor">10&nbsp;$FIRE</span> plus a minimal $20 maintenance fee every 90&nbsp;days.
                </p>
              </div>
              <div className="card-action shadow">
                <div className="badge-title c-w fs-20">
                  <div className="yellow-circle">3</div>
                  enjoy rewards
                </div>
                <p data-nsfw-filter-status="swf">
                  You can create up to <span className="phxColor">100&nbsp;Phoenix Nests</span> per wallet. Claim accrued rewards at your convenience.
                </p>
              </div>
              <button className="action-btn btn mobile-show m-t-40" onClick={this.goAppPage}>Try it</button>
            </div>
          </div>
        </section>

        <section id="section-nest">
          <div className="content mx-auto">
            <div className="nest-left">
              <div className="nest-left-content">
                <span className="noto-medium">Phoenix Community Capital</span> works for its investors
                by leveraging combined investment capital, which elevates into investment options that are not available to the average investor.
              </div>
              <div className="m-t-30 nest-left-content">
                <span className="noto-medium">How does your wealth grow?</span><br />
                Phoenix Community Capital enlists trusted and experienced investment advisors, who research new trends and opportunities for the community investment portfolio. Each investment option is delivered to the community along with a report, which will be voted on by the DAO using blockchain to validate votes.
              </div>
              <div className="mobile-show w-full flex justify-center">
                <div className="nest-right mx-auto"></div>
              </div>
              <button className="btn action-btn" onClick={() => { window.open("/docs/Phoenix Community Capital White Paper.pdf") }}>Learn More</button>
            </div>
            <div className="nest-right mobile-hidden"></div>
          </div>
        </section>




        <section id="chip-vision">
          <div className="chips-container">
            <div id="chips-header"><h2 className="headTwo">Phoenix Community Capital Member Benefits</h2></div>
            <div className="chips">
              <div className=" chip">
              <i className="fas fa-check"></i>
                Lowered Risk
              </div>
              <div className=" chip">
              <i className="fas fa-check"></i>
                Less Fees
              </div>
              <div className=" chip">
              <i className="fas fa-check"></i>
                Less Hassle
              </div>
              <div className=" chip">
              <i className="fas fa-check"></i>
                Less Research
              </div>
            </div>
          </div>
        </section>


        <section id="section-team">
          <div className="team-container">
            
          <h2 className="teamTitle">Our Team</h2>


          

          <div className="team">



          <div className="team_member">
              <div className="team-image">
                  <img src="/img/eric-marshall.png" alt="Eric Marshall - Founder"/>
                  <div className="fire-container">
                    <div className="red flame"></div>
                    <div className="orange flame"></div>
                    <div className="yellow flame"></div>
                    <div className="white flame"></div>
                  </div>
              </div>
              <div className="btn_grp">
                <a href="https://www.linkedin.com/in/ericcmarshall/" target="_blank"><i className="fab fa-linkedin"></i></a>
              </div>
              <h3>Eric Marshall</h3>
              <p>Co-Founder</p>
            </div>

            <div className="team_member">
              <div className="team-image">
                  <img src="/img/luke-sullivan.png" alt="Luke Sullivan - Founder"/>
                  <div className="fire-container">
                    <div className="red flame"></div>
                    <div className="orange flame"></div>
                    <div className="yellow flame"></div>
                    <div className="white flame"></div>
                  </div>
              </div>
              <div className="btn_grp">
                <a href="https://www.linkedin.com/in/luke-sullivan-0750b7aa/" target="_blank"><i className="fab fa-linkedin"></i></a>
              </div>
              <h3>Luke Sullivan</h3>
              <p>Co-Founder</p>
            </div>



          </div>


          </div>
        </section>

       {/* <section id="section-roadmap">
          <div className="team-container">

            <h2 className="teamTitle">Roadmap</h2>


            <ul class="timeline">

               
              <li>
                <div class="direction-r">
                  <div class="flag-wrapper">
                    <span class="flag">Team formation</span>
                    <span class="time-wrapper"><span class="time">Q1 2022 - present</span></span>
                  </div>
                  <div class="desc">Selection of our team members. Selection of our team members.</div>
                </div>
              </li>
              
          
              <li>
                <div class="direction-l">
                  <div class="flag-wrapper">
                    <span class="flag">Q2 2022 - Launch of Mouvre</span>
                    <span class="time-wrapper"><span class="time">July 20th</span></span>
                  </div>
                  <div class="desc">Launch of first NFT exchange called Mouvre.</div>
                </div>
              </li>

             
              <li>
                <div class="direction-r">
                  <div class="flag-wrapper">
                    <span class="flag">Q3 2022 - Swapsicle</span>
                    <span class="time-wrapper"><span class="time">Sept 2022</span></span>
                  </div>
                  <div class="desc">Launch of first new exchanged called Swapsicle.</div>
                </div>
              </li>

             
              <li>
                <div class="direction-l">
                  <div class="flag-wrapper">
                    <span class="flag">Q2 2022 - Launch of Mouvre</span>
                    <span class="time-wrapper"><span class="time">July 20th</span></span>
                  </div>
                  <div class="desc">Launch of first NFT exchange called Mouvre.</div>
                </div>
              </li>

        
              <li>
                <div class="direction-r">
                  <div class="flag-wrapper">
                    <span class="flag">Q3 2022 - Swapsicle</span>
                    <span class="time-wrapper"><span class="time">Sept 2022</span></span>
                  </div>
                  <div class="desc">Launch of first new exchanged called Swapsicle.</div>
                </div>
              </li>

            
              <li>
                <div class="direction-l">
                  <div class="flag-wrapper">
                    <span class="flag">Q2 2022 - Launch of Mouvre</span>
                    <span class="time-wrapper"><span class="time">July 20th</span></span>
                  </div>
                  <div class="desc">Launch of first NFT exchange called Mouvre.</div>
                </div>
              </li>

           
              <li>
                <div class="direction-r">
                  <div class="flag-wrapper">
                    <span class="flag">Q3 2022 - Swapsicle</span>
                    <span class="time-wrapper"><span class="time">Sept 2022</span></span>
                  </div>
                  <div class="desc">Launch of first new exchanged called Swapsicle.</div>
                </div>
              </li>
              
            </ul>

          </div>
        </section>
        */}

      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    grand_nft_url: state.grand_nft_url,
    master_nft_url: state.master_nft_url
  };
}

export default connect(mapStateToProps)(HomeStart);