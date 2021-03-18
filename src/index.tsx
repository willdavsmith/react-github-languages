import * as React from 'react'
import * as colors from './colors.json'

export interface GithubLanguagesProps {
  repository: string;
  width: number;
  textColor?: string;
  lightColor?: string;
}

export default function GithubLanguages(props: GithubLanguagesProps) {
  const [data, setData] = React.useState<Record<string, number>>()
  React.useEffect(() => {
    async function init() {
      if (/\S+\/\S/gi.test(props.repository)) {
        try {
          const response = await fetch(`https://api.github.com/repos/${props.repository}/languages`)
          if (!response.ok) {
            throw new Error(`Failed to fetch repository: ${props.repository}`)
          } else {
            const jsonResponse = await response.json()
            setData(jsonResponse)
          }
        } catch (error) {
            throw new Error(`Failed to fetch repository: ${props.repository}`)
        }
      } else {
        throw new Error(`Invalid repository: ${props.repository}`)
      }
    }
    init()
  }, [])

  if (data) {
    let total = 0;
    Object.keys(data).forEach((lang: string) => {
      total += data[lang];
    });

    return (
      <div style={{ display: "flex-col" }}>
        <h2 style={{ color: props.textColor || "black", fontSize: 24 }}>Languages</h2>
        <div>
          <ul style={{ display: "flex", listStyleType: "none", margin: 0, padding: 0, overflow: 'hidden' }}>
            {Object.keys(data).map((language: string, index: number) => {
              return (
                <li key={language}>
                  <div
                    style={{
                      backgroundColor: colors[language]["color"],
                      width: Math.max(
                        (data[language] / total) * props.width,
                        5
                      ),
                      height: 10,
                      marginRight: 2,
                      borderRadius:
                        index === 0
                          ? index === Object.keys(data).length - 1
                            ? "10px 10px 10px 10px"
                            : "10px 0 0 10px"
                          : index === Object.keys(data).length - 1
                            ? "0 10px 10px 0"
                            : ""
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div style={{ width: props.width }}>
          <ul style={{ display: "flex", flexWrap: "wrap", listStyleType: "none", margin: 0, padding: 0, overflow: 'hidden' }}>
            {Object.keys(data).map((language: string) => {
              return (
                <li
                  key={`${language}-name`}
                  style={{
                    margin: 2,
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center"
                  }}
                >
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: colors[language]["color"],
                      borderRadius: "50%",
                      display: "inline-block"
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 700,
                      marginLeft: 5,
                      marginRight: 5,
                      color: props.textColor || "black"
                    }}
                  >
                    {language}
                  </span>
                  <span style={{ color: props.lightColor || "gray" }}>
                    {((data[language] / total) * 100).toFixed(1)}%
                </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );

  } else return null
}
