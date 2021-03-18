import { useState, useEffect } from "react";
import HaikusTab from "./Tabs/HaikusTab";
import RacerTab from "./Tabs/RacerTab";
import LiveryUploadTab from './Tabs/LiveryUploadTab';
import AdminTab from "./Tabs/AdminTab";
import { BsTrash } from "react-icons/bs";

const DashBody = ({ userD, onLogout }) => {
  var d = new Date();

  const [haikus, setHaikus] = useState([
    {
      __createdtime__: 1611090302995,
      __updatedtime__: 1611090302995,
      haikuLines: [
        "Loading your haikus",
        "hopefully you'll see yours soon",
        "hopefully right now",
      ],
      name: "Loading...",
      url: "0",
      uuid: "",
    },
  ]);
  const [user, setUser] = useState(userD);

  useEffect(() => {
    const getHaikus = async () => {
      const haikusFromServer = await fetchHaikus();
      setHaikus(haikusFromServer);
    };

    getHaikus();
    /* eslint-disable-next-line */
  }, []);

  const onDeleteNotif = async (id) => {
    console.log(user.uuid);
    await fetch(`https://api.gabirmotors.ga/user/alert/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uuid: user.uuid,
        num: id,
      }),
    })
      .then(async (res) => {
        var data = await res.json();
        setUser({ ...user, alerts: user.alerts.filter((a, i) => i !== id) });
        console.log(data);
        return data;
      })
      .catch((e) => {
        alert("There was an error");
        console.log(e);
        return e;
      });
  };

  const fetchHaikus = async () => {
    const res = await fetch(
      `https://api.gabirmotors.ga/user/${user.uuid}/haikus`
    );
    const data = await res.json();

    return data;
  };

  const Racer = () => {
    if (user.roles.includes("racer")) {
      /* eslint-disable-next-line */
      return (
        <li>
          <a href="#">Racer</a>
        </li>
      );
    } else {
      /* eslint-disable-next-line */
      return (
        <li>
          <a href="#"></a>
        </li>
      );
    }
  };

  const Upload = () => {
    if (user.roles.includes("user")) {
      /* eslint-disable-next-line */
      return (
        <li>
          <a href="#">Livery Upload</a>
        </li>
      );
    } else {
      /* eslint-disable-next-line */
      return (
        <li>
          <a href="#"></a>
        </li>
      );
    }
  };


  const Admin = () => {
    if (user.roles.includes("admin")) {
      /* eslint-disable-next-line */
      return (
        <li>
          <a href="#">Admin</a>
        </li>
      );
    } else {
      /* eslint-disable-next-line */
      return (
        <li>
          <a href="#"></a>
        </li>
      );
    }
  };

  const Tabs = () => {
    return (
      <ul
        className="uk-tab-top"
        uk-tab="connect: #component-tab-bottom; animation: uk-animation-fade"
      >
        {/* eslint-disable-next-line */}
        <li>
          <a href="#">User</a>
        </li>
        {/* eslint-disable-next-line */}
        <li>
          <a href="#">Haikus</a>
        </li>
        <Upload />
        <Racer />
        <Admin />
      </ul>
    );
  };

  const ShowUpload = () => {
    if (user.roles.includes("user")) {
      return <LiveryUploadTab user={user} />;
    } else {
      return <li></li>;
    }
  };

  const ShowRacer = () => {
    if (user.roles.includes("racer")) {
      return <RacerTab user={user} />;
    } else {
      return <li></li>;
    }
  };

  const ShowAdmin = () => {
    if (user.roles.includes("admin")) {
      return <AdminTab />;
    } else {
      return <li></li>;
    }
  };

  return (
    <>
      <div
        className="uk-height-large uk-background-fixed uk-light uk-flex uk-background-cover"
        style={{ backgroundImage: "url(img/gabir_bg.jpg)", height: "100vh" }}
      >
        <div className="uk-section uk-section-secondary uk-position-center uk-padding-large">
          <div>
            <div uk-grid>
              <div className="uk-width-auto@m">
                <Tabs />
              </div>
              <div className="uk-width-expand@m">
                <ul id="component-tab-bottom" className="uk-switcher">
                  <li>
                    <h3 className="uk-text-center">Hello, {user.name}</h3>
                    <div>
                      <h4 className="uk-text-center">Notifications:</h4>
                      {user.alerts.map((alert, i) => (
                        <>
                          <hr></hr>
                          <div
                            class="uk-card uk-card-body uk-card-small"
                            key={i}
                          >
                            <BsTrash
                              className="uk-text-danger uk-float-right uk-text-large"
                              style={{ cursor: "pointer" }}
                              uk-tooltip="Delete Notification"
                              onClick={() => {
                                onDeleteNotif(i);
                              }}
                            />
                            <h3 class="uk-card-title uk-display-inline">
                              {alert.title}
                            </h3>{" "}
                            <span className="uk-text-muted"></span>
                            <p>{alert.bodytext}</p>
                          </div>
                        </>
                      ))}
                      {/* eslint-disable-next-line */}
                      <a
                        className="uk-button uk-button-danger uk-align-center"
                        onClick={() => {
                          onLogout();
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  </li>
                  <li>
                    <HaikusTab haikus={haikus} setHaikus={setHaikus} />
                  </li>
                  <li>
                    <ShowUpload />
                  </li>
                  <li>
                    <ShowRacer />
                  </li>
                  <li>
                    <ShowAdmin />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ zIndex: "-99" }}
          className="uk-grid-small uk-child-width-auto uk-margin uk-position-bottom-center uk-margin-xlarge-top@m"
          uk-grid="true"
          uk-scrollspy="cls: uk-animation-fade; target: .fade-p1; delay: 500; repeat: true"
        >
          <div>
            <h4 className="fade-p1">{`Gabir Motors • ${d.getFullYear()}`}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBody;
