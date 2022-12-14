import React from "react";
import { FaAngleDown } from "react-icons/fa";

const Blog = () => {
  return (
    <div className="min-h-[90vh] container mx-auto p-5">
      <h2 className="text-center text-3xl font-bold mb-4">Blog</h2>
      <div>
        <div className="collapse rounded-md bg-gray-300 my-3">
          <input type="checkbox" className="peer" />
          <div className="collapse-title ">
            <FaAngleDown></FaAngleDown> What are the different ways to manage a
            state in a React application?
          </div>
          <div className="collapse-content">
            <p>
              In react application, to keeping track of your data how it
              changes, you have to use "React-State".
              <br /> There are several ways to manage state in react. Some of
              them are in the following:
              <p>
                <strong>Hooks:</strong> Hooks is a tool that keep tracking of
                you r props, when it changes you get that changes without
                running any extra function
              </p>
              <p>
                <strong>React Context API:</strong> React Context allows us to
                share our state across the component more easily.
              </p>
              <p>
                <strong>Apollo Link State:</strong> Apollo link state allow you
                to store your local data inside the Apollo cache alongside your
                remote data
              </p>
            </p>
          </div>
        </div>
        <div className="collapse rounded-md bg-gray-300 my-3">
          <input type="checkbox" className="peer" />
          <div className="collapse-title ">
            <FaAngleDown></FaAngleDown> How does prototypical inheritance work?
          </div>
          <div className="collapse-content">
            <p>
              In javaScript object can inherit properties of another object. The
              object where the properties are inherited is called prototype.
            </p>
          </div>
        </div>
        <div className="collapse rounded-md bg-gray-300 my-3">
          <input type="checkbox" className="peer" />
          <div className="collapse-title ">
            <FaAngleDown></FaAngleDown> What is a unit test? Why should we write
            unit tests?
          </div>
          <div className="collapse-content">
            <p>
              The main objective of unit testing is to isolate written code to
              test and determine if it works as intended. Unit testing is an
              important step in the development process, because if done
              correctly, it can help detect early flaws in code which may be
              more difficult to find in later testing stages.
            </p>
          </div>
        </div>
        <div className="collapse rounded-md bg-gray-300 my-3">
          <input type="checkbox" className="peer" />
          <div className="collapse-title ">
            <FaAngleDown></FaAngleDown> React vs. Angular vs. Vue?
          </div>
          <div className="collapse-content">
            <p>
              <strong>React:</strong>
              <br />
              One of the main reasons for the popularity of React is that it
              works very efficiently with the DOM.
              <br />
              <strong>Vue:</strong>
              <br />
              Vue also uses the virtual DOM, but compared to React, Vue has
              better performance and stability. Vue and React's performance
              difference is subtle since it is only a few milliseconds.
              <br />
              <strong>Angular:</strong>
              <br />
              For teams building an application out of a small learning curve,
              React is a go-to option. At the same time, when creating an
              enterprise-grade app with extensive development, Angular will fit
              best as a steeper learning curve is not a problem for these teams
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
