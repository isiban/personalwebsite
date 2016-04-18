;(function () {
  "use strict";

  require("angular");
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
        // Extend d3 selection with a moveToFront property
        d3.selection.prototype.moveToFront = function() {
          return this.each(function(){
            this.parentNode.appendChild(this);
          });
        }

        var skills = ctrl.getSkills(),
            config = {
              width: 900,
              height: 500,
              radius: 100,
              spaceBeetweenArc: 20,
              circleText: "Skills"
            };

        var getFontSize = function (element) {
           var len = element.length,
               size = config.radius / 3;

          if (element.length >= 7) {
            size *= 10 / len;
            return Math.round(size) + "px";
          } else {
            return "30px";
          }
        };

        // Create svg element from directive declaration
        var svg = d3.select(element[0])
                    .append("svg:svg")
                    .attr("width", "100%")
                    .attr("height", "440")
                    .attr("viewBox", "0 0 " + config.width * 2 + " " + config.height * 2 )
                    .attr("preserveAspectRatio", "xMidYMin meet")
                    .append("svg:g")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr("transform", "translate(" + config.width / 2 + "," + config.height / 2 + ")");

        var circleContainer = svg.append("svg:g");

        // Append first circle to the svg
        var firstCircle = circleContainer
                        .append("circle")
                        .style("stroke", "none")
                        .style("fill", "#193340")
                        .attr("r", config.radius)
                        .attr("cx", config.width / 2)
                        .attr("cy", config.width / 4);

        // Create and append the circle's text
        var initialText = circleContainer
                          .append("svg:text")
                          .style("text-anchor", "middle")
                          .attr("dy", 12)
                          .attr("x", config.width / 2)
                          .attr("y", config.width / 4)
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

          svg.append("path")
             .attr("d", arc)
             .attr("class", skill.name.toLowerCase())
             .attr("data-name", skill.name)
             .attr("data-percentage", skill.percentage)
             .attr("fill", skill.color)
             .style("stroke", skill.color)
             .style("stroke-width", 15)
             .attr("transform", "translate(" + config.width / 2 + "," + config.width / 4 + ")")
             .on("mouseover", function () {
                var currentPath = d3.select(this),
                    circleText = d3.select(".circle_text");

                currentPath
                  .transition()
                  .duration(300)
                  .style("stroke-width", 45)
                  .style("opacity", 0.75);

                currentPath.moveToFront();

                circleText.text(function () {
                  return currentPath[0][0].getAttribute("data-name");
                })
                .style("font-size", function () {
                  return getFontSize(currentPath[0][0].getAttribute("data-name"));
                });

                circleText.append("tspan")
                 .text(function () { return skill.percentage + "%" })
                 .style("font-size", "30px")
                 .attr("x", config.width / 2)
                 .attr("y", config.width / 4)
                 .attr("dy", 50);
             })
             .on("mouseout", function () {
                var currentPath = d3.select(this),
                    circleText = d3.select(".circle_text");

                currentPath
                  .transition()
                  .duration(300)
                  .style("stroke-width", 15)
                  .style("opacity", 1);

                circleText.text(function () {
                  return config.circleText;
                })
                .style("font-size", function () {
                  return getFontSize(config.circleText);
                });
             });
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

        var mouseOverFunction = function (selector) {

          var currentPath = d3.select("path." + selector.name.toLowerCase()),
              circleText = d3.select(".circle_text");

          currentPath
            .transition()
            .duration(300)
            .style("stroke-width", 45)
            .style("opacity", 0.75);

          currentPath.moveToFront();

          circleText.text(function () {
            return currentPath[0][0].getAttribute("data-name");
          })
          .style("font-size", function () {
            return getFontSize(currentPath[0][0].getAttribute("data-name"));
          });

          circleText.append("tspan")
           .text(function () { return selector.percentage + "%" })
           .style("font-size", "30px")
           .attr("x", config.width / 2)
           .attr("y", config.width / 4)
           .attr("dy", 50);
        }

        var mouseOutFunction = function (selector) {

          if (selector === undefined) { return; }

          var currentPath = d3.select("path." + selector.name.toLowerCase()),
              circleText = d3.select(".circle_text");

          currentPath
            .transition()
            .duration(300)
            .style("stroke-width", 15)
            .style("opacity", 1);

          circleText.text(function () {
            return config.circleText;
          })
          .style("font-size", function () {
            return getFontSize(config.circleText);
          });
        }

      }
    }
  };

  module.exports = {
    name: "skillDiagram",
    fn: skillDiagram
  }

})();
