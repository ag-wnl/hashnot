import "../App.css";
import Navbar from "../components/Navbar";
import React, { useEffect, useState } from "react";
import Posts from "../components/Posts";
import Share from "../components/Share";
import SidePosts from "../components/SidePosts";
import Footer from "../components/Footer";
import Post from "../components/Post";
import NoResult from "../components/NoResult";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Spinner,
  Tag,
  TagCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";

function Explore() {
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.userId;
  // const [userId, setUserId] = useState(currentUser?.userId)

  const [sharePostOpen, setsharePostOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sorter, setSorter] = useState("");
  const [objective, setObjective] = useState("");
  const [sliderValue, setSliderValue] = useState(1);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillClick = (skillId) => {
    const skill_id = parseInt(skillId, 10);
    const skill = skillsData.find((skill) => skill.id === skill_id);

    const checkIfExists = selectedSkills.some(
      (selectedSkill) => selectedSkill.id === skill.id
    );
    if (!checkIfExists) {
      setSelectedSkills((prev) => [
        ...prev,
        { id: skill.id, skill: skill.skill },
      ]);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8800/api/skills`).then((response) => {
      setSkillsData(response.data);
      setLoading(false);
    });
  }, []);

  const handleClearBtnClick = () => {
    setSelectedSkills([]);
    setObjective("");
    setSliderValue(1);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleSortChange = (e) => {
    setSorter(e.target.value);
  };
  const handleObjectiveChange = (e) => {
    setObjective(e.target.value);
  };

  const handleRemoveSkill = (skillId) => {
    // Remove the skill from the selectedSkills list
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  useEffect(() => {
    if (search === "") {
      setSearchedPosts([]);
    } else {
      setDataLoading(true);
      const fetchData = async () => {
        try {
          const searchPostData = await axios.get(
            `http://localhost:8800/api/search?q=${search}`
          );
          setSearchedPosts(searchPostData.data);
          console.log(searchPostData.data);
          setDataLoading(false);
        } catch (error) {
          setDataLoading(false);
          console.log("Error occured : ", error);
        }
      };

      const getData = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(getData);

      // fetchData();
    }
  }, [search]);

  return (
    <>
      <Navbar />
      <div class="page-parent">
        <div class="explore-header">
          <h2 style={{ fontWeight: "700" }}>Explore</h2>

          {!isMobile && (
            <div>
              <InputGroup>
                <InputLeftAddon>
                  <Search2Icon />
                </InputLeftAddon>
                <Input
                  // onKeyUp={debounceSearch(200)}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                />
              </InputGroup>
            </div>
          )}

          <Button
            leftIcon={<AddIcon />}
            style={{ borderRadius: "60px" }}
            onClick={() => setsharePostOpen(!sharePostOpen)}
          >Create</Button>
        </div>

        {sharePostOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Share />
          </div>
        )}

        {isMobile && (
          <div class="mobile-explore-utility-bar">
            <div>
              <Button
                size="sm"
                ref={btnRef}
                colorScheme="telegram"
                onClick={onOpen}
              >
                Filters
              </Button>
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Filters</DrawerHeader>

                  <DrawerBody
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div class="filter-row">
                      <p>Sort by</p>
                      <form>
                        <label htmlFor="sort"></label>

                        <Select
                          size="sm"
                          name="sort"
                          id="sort"
                          value={sorter}
                          onChange={handleSortChange}
                        >
                          <option>No Selection</option>
                          <option value="recent">Most Recent</option>
                          <option value="highest">Upvotes</option>
                        </Select>
                      </form>
                    </div>

                    {/* Skills Selection */}
                    <div class="filter-row">
                      <p>Skills</p>

                      <Select
                        size="sm"
                        onChange={(e) => handleSkillClick(e.target.value)}
                      >
                        {loading ? (
                          <Spinner />
                        ) : (
                          skillsData.map((skill) => (
                            <option
                              value={skill.id}
                              style={{ cursor: "pointer" }}
                              key={skill.id}
                            >
                              {skill.skill}
                            </option>
                          ))
                        )}
                      </Select>
                    </div>

                    <div class="filter-selected-skills">
                      {selectedSkills &&
                        selectedSkills.map((skill) => (
                          <Tag size="sm" key={skill.id}>
                            <span>{skill.skill}</span>
                            <TagCloseButton
                              onClick={() => handleRemoveSkill(skill.id)}
                            />
                          </Tag>
                        ))}
                    </div>

                    <div class="filter-row">
                      <p>Team Size</p>

                      <input
                        class="number-req-selector-filter"
                        onChange={handleSliderChange}
                        type="range"
                        id="slider"
                        value={sliderValue}
                        defaultValue={1}
                        min="1"
                        max="12"
                        step="1"
                      />
                      <div className="slider-container">
                        <span className="slider-value">{sliderValue}</span>
                      </div>
                    </div>

                    <div class="filter-row">
                      <p>Objective</p>

                      <form>
                        <Select
                          size="sm"
                          name="sort"
                          id="sort"
                          value={objective}
                          onChange={handleObjectiveChange}
                        >
                          <option class="sort-selection" value="nan">
                            No Selection
                          </option>
                          <option value="Hackathon">Hackathon</option>
                          <option value="Project">Project</option>
                        </Select>
                      </form>
                    </div>
                  </DrawerBody>

                  <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                      Done
                    </Button>
                    <Button onClick={handleClearBtnClick} colorScheme="pink">
                      Clear Filters
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>

            <div>
              <InputGroup>
                <InputLeftAddon>
                  <Search2Icon />
                </InputLeftAddon>
                <Input
                  // onKeyUp={debounceSearch(200)}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                />
              </InputGroup>
            </div>
          </div>
        )}

        <div class="side-by-side-posts">
          {/* search Filters */}
          {!isMobile && (
            <div class="filter-parent-box">
              <div class="filter-container">
                <span
                  style={{
                    fontSize: "20px",
                    borderBottom: "1px solid #4750ad",
                    paddingBottom: "8px",
                  }}
                >
                  Filters
                </span>

                <div class="filter-row">
                  <p>Sort by</p>
                  <form>
                    <label htmlFor="sort"></label>

                    <Select
                      size="sm"
                      name="sort"
                      id="sort"
                      value={sorter}
                      onChange={handleSortChange}
                    >
                      <option>No Selection</option>
                      <option value="recent">Most Recent</option>
                      <option value="highest">Upvotes</option>
                    </Select>
                  </form>
                </div>

                {/* Skills Selection */}
                <div class="filter-row">
                  <p>Skills</p>

                  <Select
                    size="sm"
                    onChange={(e) => handleSkillClick(e.target.value)}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      skillsData.map((skill) => (
                        <option
                          value={skill.id}
                          style={{ cursor: "pointer" }}
                          key={skill.id}
                        >
                          {skill.skill}
                        </option>
                      ))
                    )}
                  </Select>
                </div>

                <div class="filter-selected-skills">
                  {selectedSkills &&
                    selectedSkills.map((skill) => (
                      <Tag size="sm" key={skill.id}>
                        <span>{skill.skill}</span>
                        <TagCloseButton
                          onClick={() => handleRemoveSkill(skill.id)}
                        />
                      </Tag>
                    ))}
                </div>

                <div class="filter-row">
                  <p>Team Size</p>

                  <input
                    class="number-req-selector-filter"
                    onChange={handleSliderChange}
                    type="range"
                    id="slider"
                    value={sliderValue}
                    defaultValue={1}
                    min="1"
                    max="12"
                    step="1"
                  />
                  <div className="slider-container">
                    <span className="slider-value">{sliderValue}</span>
                  </div>
                </div>

                <div class="filter-row">
                  <p>Objective</p>

                  <form>
                    <Select
                      size="sm"
                      name="sort"
                      id="sort"
                      value={objective}
                      onChange={handleObjectiveChange}
                    >
                      <option class="sort-selection" value="nan">
                        No Selection
                      </option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Project">Project</option>
                    </Select>
                  </form>
                </div>

                <div class="filter-row">
                  <Button size="sm" onClick={handleClearBtnClick}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Fetching posts according to search result, or if not then default posts */}
          <div style={{ marginTop: "40px" }}>
            {userId && currentUser && search === "" && (
              <Posts
                userId={userId}
                sorted={sorter}
                aim={objective}
                skills={selectedSkills}
                teamSize={sliderValue}
              />
            )}

            <div class="post-search-container">
              {dataLoading ? (
                <Spinner style={{ margin: "50px" }} />
              ) : search !== "" && searchedPosts.length === 0 ? (
                <NoResult searchQ={search} />
              ) : (
                searchedPosts.length !== 0 &&
                searchedPosts.map((post) => <Post post={post} key={post.id} />)
              )}
            </div>
          </div>

          {/* Side posts : for ads and hackathon promos */}
          {!isMobile && (
            <div class="side-post-parent">{/* <SidePosts /> */}</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
