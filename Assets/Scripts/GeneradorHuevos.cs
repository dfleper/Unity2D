using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GeneradorHuevos : MonoBehaviour
{
    public GameObject prefabHuevos;
    // Start is called before the first frame update
    private float randomX;
    private float randomY;
    private int contadorHuevos;
    void Start()
    {
        contadorHuevos = 0;
        StartCoroutine(OleadaHuevos());
    }
    // Update is called once per frame
    void Update()
    {

    }
    public void CrearHuevo()
    {
        randomX = Random.Range(-10.5f, 10.5f);
        randomY = Random.Range(2.0f, 5.0f);
        GameObject a = Instantiate(prefabHuevos) as GameObject;
        a.transform.position = new Vector3(randomX, randomY, -4.0f);
        contadorHuevos++;
    }
    IEnumerator OleadaHuevos()
    {
        while (true)
        {
            yield return new WaitForSeconds(1f);
            if (contadorHuevos < 12)
            {
                CrearHuevo();
            }
        }
    }
}
