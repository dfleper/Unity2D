using UnityEngine;
using UnityEngine.SceneManagement;

public class GameOver : MonoBehaviour
{
    private int huevosColision = 0;
    public GameObject gameOverPanel;

    private void Update()
    {
        // Update runs with Time.timeScale == 0, so R works after game over.
        if (gameOverPanel != null && gameOverPanel.activeSelf && Input.GetKeyDown(KeyCode.R))
            ReiniciarPartida();
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Huevo"))
        {
            huevosColision++;
            if (huevosColision >= 6)
                MostrarGameOver();
        }
    }

    private void MostrarGameOver()
    {
        if (gameOverPanel != null)
            gameOverPanel.SetActive(true);
        Time.timeScale = 0f;
    }

    // Public method invoked by the WebGL HTML button (SendMessage).
    public void ReiniciarPartida()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
