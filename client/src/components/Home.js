import React, { useContext } from "react";
import Popup from "./Popup.js";
import Popupsignin from "./Popupsignin";
import "./Home.css";

import { person } from "../App.js";
import Signout from "./Signout";
import Slick from "./Slick.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// const mygroupdirect = () => {
//   window.location.replace("/mygroups");
// };
// const direct = () => {
//   window.location.replace("/creategroup");
// };

function Home() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    initialSlide: 0,
  };
  const usertoken = useContext(person);
  console.log("The usertoken is : ", usertoken);
  return (
    <div className="home">
      <div className="header">
        {/* {usertoken !== undefined ? (
          <>
            {usertoken[0] ? (
              <div>
                <button onClick={() => mygroupdirect()}>My groups</button>

                <button
                  onClick={() => {
                    direct();
                  }}
                >
                  Create New group
                </button>

                <Signout />
              </div>
            ) : (
              <div>
                <Popup />
                <Popupsignin />
              </div>
            )}
          </>
        ) : (
          <></>
        )} */}
      </div>
      <div className="app ">
        <Slider {...settings}>
          <div className="container">
            <img
              className="slick-image"
              src="https://www.simplegermany.com/wp-content/uploads/2021/04/friends-in-Germany.svg"
            ></img>
            <p>
              Jeon Jung-kook (Korean: 전정국) was born on September 1, 1997, in
              Busan, South Korea.[2][3][4] His family consists of his parents
              and an elder brother.[5][4] He attended Baekyang Elementary and
              Middle School in Busan. When he became a trainee, he transferred
              to Singu Middle School in Seoul.[6] Jungkook initially had dreams
              of becoming a badminton player when he was younger, but after
              seeing G-Dragon perform "Heartbreaker" on television, it
              influenced him to want to become a singer.[7] In 2011, Jungkook
              auditioned for the South Korean talent show Superstar K during its
              auditions in Daegu.[8] Though he was not selected, he received
              casting offers from seven entertainment companies. He eventually
              chose to become a trainee under Big Hit Entertainment after seeing
              RM, now his fellow band member and leader in BTS, perform.[8] To
              work on his dance skills in preparation for debut, he went to Los
              Angeles during the summer of 2012 to receive dance training from
              Movement Lifestyle.[9] In June 2012, he appeared in Jo Kwon's "I'm
              
              
            </p>
          </div>
          <div className="container">
            <img
              className="slick-image"
              src="https://img.freepik.com/free-vector/female-friends-hanging-out-cafe_74855-5248.jpg?w=2000"
            ></img>
            <p>
              Jeon Jung-kook (Korean: 전정국) was born on September 1, 1997, in
              Busan, South Korea.[2][3][4] His family consists of his parents
              and an elder brother.[5][4] He attended Baekyang Elementary and
              Middle School in Busan. When he became a trainee, he transferred
              to Singu Middle School in Seoul.[6] Jungkook initially had dreams
              of becoming a badminton player when he was younger, but after
              seeing G-Dragon perform "Heartbreaker" on television, it
              influenced him to want to become a singer.[7] In 2011, Jungkook
              auditioned for the South Korean talent show Superstar K during its
              auditions in Daegu.[8] Though he was not selected, he received
              casting offers from seven entertainment companies. He eventually
              chose to become a trainee under Big Hit Entertainment after seeing
              RM, now his fellow band member and leader in BTS, perform.[8] To
              work on his dance skills in preparation for debut, he went to Los
              Angeles during the summer of 2012 to receive dance training from
              Movement Lifestyle.[9] In June 2012, he appeared in Jo Kwon's "I'm
              Da One" music video[10] and also worked as a backup dancer for
              Glam before his debut.[11] He graduated from School of Performing
              
            </p>
          </div>
          <div className="container">
            <img
              className="slick-image"
              src="https://png.pngtree.com/png-vector/20200430/ourlarge/pngtree-women-telecommunications-with-friends-online-png-image_2196675.jpg"
            ></img>
            <p>
              Jeon Jung-kook (Korean: 전정국) was born on September 1, 1997, in
              Busan, South Korea.[2][3][4] His family consists of his parents
              and an elder brother.[5][4] He attended Baekyang Elementary and
              Middle School in Busan. When he became a trainee, he transferred
              to Singu Middle School in Seoul.[6] Jungkook initially had dreams
              of becoming a badminton player when he was younger, but after
              seeing G-Dragon perform "Heartbreaker" on television, it
              influenced him to want to become a singer.[7] In 2011, Jungkook
              auditioned for the South Korean talent show Superstar K during its
              auditions in Daegu.[8] Though he was not selected, he received
              casting offers from seven entertainment companies. He eventually
              chose to become a trainee under Big Hit Entertainment after seeing
              RM, now his fellow band member and leader in BTS, perform.[8] To
              work on his dance skills in preparation for debut, he went to Los
              Angeles during the summer of 2012 to receive dance training from
              Movement Lifestyle.[9] In June 2012, he appeared in Jo Kwon's "I'm
              
            </p>
          </div>
          <div className="container">
            <img
              className="slick-image"
              src="https://img.freepik.com/premium-vector/woman-using-phone-collective-virtual-meeting-group-video-conference-woman-chatting-with-friends-online-video-conference-remote-work-technology-concept_186332-309.jpg?w=2000"
            ></img>
            <p>
              Jeon Jung-kook (Korean: 전정국) was born on September 1, 1997, in
              Busan, South Korea.[2][3][4] His family consists of his parents
              and an elder brother.[5][4] He attended Baekyang Elementary and
              Middle School in Busan. When he became a trainee, he transferred
              to Singu Middle School in Seoul.[6] Jungkook initially had dreams
              of becoming a badminton player when he was younger, but after
              seeing G-Dragon perform "Heartbreaker" on television, it
              influenced him to want to become a singer.[7] In 2011, Jungkook
              auditioned for the South Korean talent show Superstar K during its
              auditions in Daegu.[8] Though he was not selected, he received
              casting offers from seven entertainment companies. He eventually
              chose to become a trainee under Big Hit Entertainment after seeing
              RM, now his fellow band member and leader in BTS, perform.[8] To
              work on his dance skills in preparation for debut, he went to Los
              Angeles during the summer of 2012 to receive dance training from
              Movement Lifestyle.[9] In June 2012, he appeared in Jo Kwon's "I'm
              Da One" music video[10] and also worked as a backup dancer for
              Glam before his debut.[11] He graduated from School of Performing
              
            </p>
          </div>
          <div className="container">
            <img
              className="slick-image"
              src="https://www.revechat.com/wp-content/uploads/2018/11/800-15-10-2019b-1.jpg"
            ></img>
            <p>
              Jeon Jung-kook (Korean: 전정국) was born on September 1, 1997, in
              Busan, South Korea.[2][3][4] His family consists of his parents
              and an elder brother.[5][4] He attended Baekyang Elementary and
              Middle School in Busan. When he became a trainee, he transferred
              to Singu Middle School in Seoul.[6] Jungkook initially had dreams
              of becoming a badminton player when he was younger, but after
              seeing G-Dragon perform "Heartbreaker" on television, it
              influenced him to want to become a singer.[7] In 2011, Jungkook
              auditioned for the South Korean talent show Superstar K during its
              auditions in Daegu.[8] Though he was not selected, he received
              casting offers from seven entertainment companies. He eventually
              chose to become a trainee under Big Hit Entertainment after seeing
              RM, now his fellow band member and leader in BTS, perform.[8] To
              work on his dance skills in preparation for debut, he went to Los
              Angeles during the summer of 2012 to receive dance training from
              Movement Lifestyle.[9] In June 2012, he appeared in Jo Kwon's "I'm
              Da One" music video[10] and also worked as a backup dancer for
              Glam before his debut.[11] He graduated from School of Performing
              
            </p>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Home;
