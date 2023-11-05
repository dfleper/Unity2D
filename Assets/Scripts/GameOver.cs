using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameOver : MonoBehaviour
{
    private int huevosColision = 0;
    public GameObject gameOverPanel;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Huevo"))
        {
            huevosColision++;
            if (huevosColision >= 6)
            {
                MostrarGameOver();
            }
        }
    }

    void MostrarGameOver()
    {
        gameOverPanel.SetActive(true);
        Time.timeScale = 0;
    }
}
