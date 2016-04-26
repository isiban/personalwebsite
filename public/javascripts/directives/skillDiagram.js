;(function () {
  "use strict";

  var d3 = require("d3");

  /**
   * [SkillDiagramController description]
   * @param {[type]} $scope    [description]
   * @param {[type]} fetchData [description]
   */
  var SkillDiagramController = function ($scope, fetchData) {
    var _skills = $scope.skills,
        _highLightedSkill = {};

    /**
     * [getSkills description]
     * @return {[type]} [description]
     */
    this.getSkills = function () {
      return _skills;
    };

    /**
     * [getSkillCssClass description]
     * @return {[type]} [description]
     */
    this.getSkillCssClass = function (index) {
      var skillClass = {};
      skillClass["active"] = _highLightedSkill === _skills[index];
      skillClass[_skills[index].name.toLowerCase()] = true;
      return skillClass;
    };

    /**
     * [highLightSkill description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    this.highLightSkill = function (index) {
      if (_highLightedSkill === _skills[index]) {
        _highLightedSkill = {};
        $scope.highLightedSkill = {};
      } else {
        _highLightedSkill = _skills[index];
        $scope.highLightedSkill = _skills[index];
      }
    };

  };

  /**
   * [skillDiagram description]
   * @return {[type]} [description]
   */
  var skillDiagram = function () {
    return {
      restrict: "A",
      controller: SkillDiagramController,
      controllerAs: "skillDiagramCtrl",
      templateUrl: "html/skill_diagram.html",
      scope: {
        skills: "="
      },
      link: function (scope, element, attrs, ctrl) {
        var skills = ctrl.getSkills(),
            config = {
              width: 1000,
              height: 1000,
              radius: 100,
              spaceBeetweenArc: 20,
              circleText: "Skills"
            };

        // Extend d3 selection with a moveToFront property
        d3.selection.prototype.moveToFront = function() {
          return this.each(function(){
            this.parentNode.appendChild(this);
          });
        }

        var getFontSize = function (element) {
           var len = element.length,
               size = config.radius / 4;

          if (element.length >= 7) {
            size *= 10 / len;
            return Math.round(size) + "px";
          } else {
            return "30px";
          }
        };

        var mouseOverFunction = function (selector) {
          var currentPath = {},
              circleText = d3.select(".circle_text");

          if (selector.hasOwnProperty("name")) {
            currentPath = d3.select("path." + selector.name.toLowerCase());
          } else {
            currentPath = d3.select(selector);
          }

          currentPath
            .transition()
            .duration(500)
            .style("stroke-width", 45)
            .style("opacity", 0.75);

          currentPath.moveToFront();

          circleText.text(function () {
            return currentPath[0][0].getAttribute("data-name");
          })
          .style("font-size", function () {
            return getFontSize(currentPath[0][0].getAttribute("data-name"));
          })
          .attr("dy", 0);

          circleText.append("tspan")
           .text(function () {
            if (selector.hasOwnProperty("name")) {
              return selector.percentage + "%"
            }
            return currentPath[0][0].getAttribute("data-percentage") + "%";
          })
           .style("font-size", "30px")
           .attr("x", config.width / 2)
           .attr("y", config.height / 2)
           .attr("dy", 50);
        };


        var mouseOutFunction = function (selector) {
          var currentPath = {},
              circleText = d3.select(".circle_text");

          if (selector.hasOwnProperty("name")) {
            currentPath = d3.select("path." + selector.name.toLowerCase());
          } else {
            currentPath = d3.select(selector);
          }

          currentPath
            .transition()
            .duration(500)
            .style("stroke-width", 15)
            .style("opacity", 1);

          circleText.text(function () {
            return config.circleText;
          })
          .style("font-size", function () {
            return getFontSize(config.circleText);
          })
          .attr("dy", 12);
        };


        // Create svg element from directive declaration
        var svg = d3.select("#diagram_container")
                    .append("svg:svg")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr("viewBox", "0 0 " + config.width + " " + config.height)
                    .attr("preserveAspectRatio", "xMidYMin meet")
                    .append("svg:g");

        var circleContainer = svg.append("svg:g");

        // Append first circle to the svg
        var firstCircle = circleContainer
                            .append("svg:circle")
                            .style("stroke", "none")
                            .attr("fill", "#24a79e");

        firstCircle.transition()
                   .duration(1000)
                   .style("fill", "#193340")
                   .attr("r", config.radius)
                   .attr("cx", config.width / 2)
                   .attr("cy", config.height / 2);

        // Create and append the circle's text
        var initialText = circleContainer
                            .append("svg:text")
                            .style("text-anchor", "middle")
                            .attr("dy", 12)
                            .attr("x", config.width / 2)
                            .attr("y", config.height / 2)
                            .style("font-size", function () { return getFontSize(config.circleText); })
                            .text(function () { return config.circleText })
                            .attr("class", "circle_text");

        var inner = config.radius + config.spaceBeetweenArc,
            outer = inner + 30,
            getRandomInRange = function (min, max) {
              return Math.floor((Math.random() * ( max - min + 1)) + min);
            };

        // Iterate over the skills dataSet in order to create the different arcs
        skills.forEach(function (skill, index) {

          if (index !== 0) {
            inner = outer + config.spaceBeetweenArc;
            outer = inner + 30;
          }

          var v = 3.6 * skill.percentage,
              alpha = v == 360 ? 359.99 : v,
              random = getRandomInRange(0, 360),
              start = random * Math.PI/180,
              end = (random - alpha) * Math.PI / 180;

          var arc = d3.svg.arc()
                      .innerRadius(inner)
                      .outerRadius(outer)
                      .startAngle(start)
                      .endAngle(end);

          var path = svg.append("svg:path")
                        .attr("d", arc)
                        .attr("class", skill.name.toLowerCase())
                        .attr("data-name", skill.name)
                        .attr("data-percentage", skill.percentage)
                        .attr("fill", "#24a79e")
                        .style("stroke", "#24a79e")
                        .style("opacity", "0")
                        .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")")
                        .on("mouseover", function () { mouseOverFunction(this); })
                        .on("mouseout", function () { mouseOutFunction(this); });

          path.transition()
              .duration(1000)
              .delay(200)
              .attr("fill", skill.color)
              .style("stroke", skill.color)
              .style("stroke-width", 15)
              .style("opacity", 1)
        });

        scope.$watchCollection(function(scope) { return scope.highLightedSkill }, function (newVal, oldVal) {
          if (oldVal !== newVal) {
            if (oldVal === undefined ) {
              mouseOverFunction(newVal);
              return;
            }
            if (!Object.keys(newVal).length) {
              mouseOutFunction(oldVal);
              return;
            }
            mouseOverFunction(newVal);
          }
        });

      }
    }
  };

  module.exports = {
    name: "skillDiagram",
    fn: skillDiagram
  }

})();
