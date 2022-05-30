import { useEffect, useState } from "react";
import { Badge, ActionIcon } from "@mantine/core";
import axios from "axios";
import { X } from 'tabler-icons-react';

import styles from "./styles/About.module.scss";

const About = (props) => {
  const User = props.User;
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const fetchInterests = async (id) => {
      const response = await axios.get(
        `http://localhost:5000/api/interest?userId=${id}`
      );
      const data = await response.data.interests;
      console.log("interests: " + data);
      setInterests(data);
    };
    fetchInterests(User.user_id);
  }, []);


  const deleteInterest = async (interestId, index) => {
      const response = await axios.delete(`http://localhost:5000/api/interest?userId=${User.user_id}&interestId=${interestId}`);
      const data = await response.data; 
      if (data?.ok) return setInterests(interests.filter(interest => interest !== interests[index]));
  }

  return (
    <section className={styles.aboutSection}>
      <div className={styles.titleBlock}>
        <h2>About</h2>
      </div>
      <div className={styles.bodyBlock}>
        <div className={styles.about}>{User?.about}</div>
        <div className={styles.interestsBlock}>
          <div className={styles.title}>
            <h3>Interests</h3>
          </div>
          <div className={styles.interests}>
            {interests?.map((interest, index) => {
              return (
                <div key={interest?.interest_id} className={styles.interest}>
                  <Badge color="grape" variant="outline">
                    {interest?.name}
                  </Badge>
                  <ActionIcon onClick={() => deleteInterest(interest?.id, index)} color="red" size="sm">
                    <X />
                  </ActionIcon>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;